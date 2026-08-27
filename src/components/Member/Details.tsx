import { useDataContext } from "../../contexts/DataContext";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import type { LeadershipRole } from "../../types/LegislatorCurrent";
import { allAreas, type StateAbbreviation } from "../../types/states";
import getDateDiff from "../../util/getDateDiff";
import ContactButtons from "./ContactButtons";
import { renderLegislatorData } from "./renderLegislatorData";
import { renderLegislatorSocial } from "./renderLegislatorSocial";
import renderLegislatorOffice from "./renderLegislatorOffice";

function abbreviateParty(party: string | undefined) {
    switch (party) {
        case 'Democrat': return 'D';
        case 'Independent': return 'I';
        case 'Republican': return 'R';
        default: return party;
    }
}
function getLeadershipRole(terms: LeadershipRole[] | undefined) {
    if (!terms || terms[terms.length - 1].end) return;
    return terms[terms.length - 1].title
}

type TabKey = 'current' | 'social' | 'offices';
const tabs: { key: TabKey, label: string }[] = [
    { key: 'current', label: 'Legislator' },
    { key: 'social', label: 'Social Media' },
    { key: 'offices', label: 'District Offices' }
];

interface PageProps {
    bioguide: string,
}
export default function Page({ bioguide }: PageProps) {
    const { legislators } = useDataContext();
    const [activeTab, setActiveTab] = useState<TabKey>('current');
    const navigate = useNavigate();
    useEffect(() => {
        function goBack(e: KeyboardEvent) {
            if (e.key === 'Escape' || e.key === 'Backspace') navigate(-1);
        }
        document.addEventListener('keydown', goBack);
        return () => document.removeEventListener('keydown', goBack)
    }, []);

    if (!legislators) return <p>No data found</p>

    const member = legislators?.find(item => item.id.bioguide === bioguide);
    if (!member) return <p>No data found for bioguide {bioguide}</p>

    const age = getDateDiff(new Date(member.bio.birthday)).years;
    const currentTerm = member.terms[member.terms.length - 1];

    return (
        <div className='min-w-0 h-full overflow-auto flex flex-col
            px-2 sm:px-5 pb-2 sm:pb-5 gap-4 sm:gap-8'>
            <NavLink to='/' className='mt-2 shrink-0 w-10 h-10 rounded-full grid place-items-center
                hover:bg-zinc-200 active:bg-zinc-300
                dark:hover:bg-zinc-700 dark:active:bg-zinc-600'>
                <span className='material-symbols-outlined'>arrow_back</span>
            </NavLink>
            <section className='w-full flex flex-col gap-2 sm:gap-8 items-center sm:flex-row'>
                <div className='bg-black rounded aspect-[225/275] w-[min(225px,40vw)] overflow-hidden'>
                    <img alt={`Profile photo for ${member.name.first} ${member.name.last}`}
                        src={`https://unitedstates.github.io/images/congress/225x275/${member.id.bioguide}.jpg`}
                        className='object-cover w-full h-full'
                    />
                </div>
                <div className='*:text-center sm:*:text-start'>
                    <div className='mb-1'>
                        <h2 className='text-3xl'>{member.name.first} {member.name.last}, {age}{member.bio.gender}</h2>
                    </div>
                    <div className='*:text-xl'>
                        <p>{`(${abbreviateParty(currentTerm.party)}) ${currentTerm.type === 'rep' ? 'Representative' : 'Senator'}`}</p>
                        <p>{`${allAreas[currentTerm.state as StateAbbreviation]}${currentTerm.district ? ', District ' + currentTerm.district : ''}`}</p>
                        <p>{getLeadershipRole(member.leadership_roles)}</p>
                    </div>
                </div>
            </section>
            <section className='flex flex-row justify-center'>
                <ContactButtons member={member} />
                <div className='hidden sm:block flex-1 ml-5 mr-1 border-t translate-y-[50%]'></div>
            </section>
            <section className='m-1 flex flex-col'>
                <nav className='ml-2 flex gap-1'>
                    {tabs.map(tab =>
                        <button
                            className={`rounded-t py-1 px-2 ${tab.key === activeTab
                                ? 'bg-zinc-200 dark:bg-zinc-700'
                                : 'bg-zinc-100 dark:bg-zinc-900'}`}
                            onClick={() => setActiveTab(tab.key)}
                            key={tab.key}>
                            {tab.label}
                        </button>
                    )}
                </nav>
                <article className='font-mono overflow-x-auto rounded p-5 bg-zinc-200 dark:bg-zinc-700'>
                    {activeTab === 'current' && renderLegislatorData(member)}
                    {activeTab === 'social' && renderLegislatorSocial(member)}
                    {activeTab === 'offices' && renderLegislatorOffice(member)}
                </article>
            </section>
        </div>
    );
}