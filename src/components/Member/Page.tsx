import { useDataContext } from "../../contexts/DataContext";
import type { LeadershipRole } from "../../types/LegislatorCurrent";
import { allAreas, type StateAbbreviation } from "../../types/states";
import getDateDiff from "../../util/getDateDiff";
import { NavLink } from "react-router";
import { renderLegislatorData } from "./renderLegislatorData";
import ContactButtons from "./ContactButtons";

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
    return <p>{terms[terms.length - 1].title}</p>
}

interface PageProps {
    bioguide: string,
}
export default function Page({ bioguide }: PageProps) {
    const { legislators } = useDataContext();
    if (!legislators) return <p>No data found</p>

    const member = legislators?.find(item => item.id.bioguide === bioguide);
    if (!member) return <p>No data found for bioguide {bioguide}</p>

    const age = getDateDiff(new Date(member.bio.birthday)).years;
    const currentTerm = member.terms[member.terms.length - 1];

    return (
        <article className='max-w-full max-h-full p-1 flex flex-col gap-1'>
            <section className='h-screen p-1 overflow-auto flex flex-col gap-2'>
                <NavLink to='/' className='shrink-0 w-10 h-10 rounded-full hover:bg-gray-200 active:bg-gray-300 grid place-items-center'>🔙</NavLink>
                <section className='mb-2 w-full flex flex-col gap-2 items-center sm:flex-row'>
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
                        <div className='mb-2 *:text-xl'>
                            <p>{`(${abbreviateParty(currentTerm.party)}) ${currentTerm.type === 'rep' ? 'Representative' : 'Senator'}`}</p>
                            <p>{`${allAreas[currentTerm.state as StateAbbreviation]}${currentTerm.district ? ', District ' + currentTerm.district : ''}`}</p>
                            <p>{getLeadershipRole(member.leadership_roles)}</p>
                        </div>
                        <ContactButtons member={member} />
                    </div>
                </section>
                <details open><summary className='hover:cursor-pointer mb-2'>legislators-current.yaml</summary>
                    {renderLegislatorData(member)}
                </details>
                <details>
                    <summary className='hover:cursor-pointer mb-2'>
                        legislators-social-media.yaml {!member.social && <span className='italic'>(no entry)</span>}
                    </summary>
                    {renderLegislatorSocial(member)}
                </details>
            </section>
        </article>
    );
}
