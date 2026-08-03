import { useDataContext } from "../contexts/DataContext";
import type { LeadershipRole, Legislator } from "../types/legislator";
import { allAreas, type StateAbbreviation } from "../types/states";
import getDateDiff from "../util/getDateDiff";
import { NavLink } from "react-router";
import { renderLegislatorData } from "./renderLegislatorData";

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

interface DetailsProps {
    bioguide: string,
}
export default function Details({ bioguide }: DetailsProps) {
    const { legislators } = useDataContext();
    const member: Legislator | undefined = legislators?.find(item => item.id.bioguide === bioguide);
    if (!member) return <p>No information found for bioguide {bioguide}</p>

    const age = getDateDiff(new Date(member.bio.birthday)).years;
    const currentTerm = member.terms[member.terms.length - 1];

    return (
        <article className='flex flex-col max-w-full max-h-full'>
            <NavLink to='/' className='rounded bg-gray-300 active:bg-gray-400'>🔙</NavLink>
            <section className='border-b p-1 w-full flex gap-2'>
                <img alt={`Profile photo for ${member.name.first} ${member.name.last}`}
                    src={`https://unitedstates.github.io/images/congress/225x275/${member.id.bioguide}.jpg`}
                    className='w-[min(225px,15vw)]'
                />
                <div>
                    <div className='mb-1'>
                        <p>{member.name.first} {member.name.last}</p>
                        <p>{age}{member.bio.gender}</p>
                    </div>
                    <div className='mb-1'>
                        <p>{`(${abbreviateParty(currentTerm.party)})${currentTerm.type === 'rep' ? 'Representative' : 'Senator'}`}</p>
                        <p>{`${allAreas[currentTerm.state as StateAbbreviation]}${currentTerm.district ? ', District ' + currentTerm.district : ''}`}</p>
                    </div>
                    {getLeadershipRole(member.leadership_roles)}
                </div>
            </section>
            <details className='overflow-auto' open><summary className='hover:cursor-pointer mb-2'>legislatorsCurrent.yaml</summary>
                {renderLegislatorData(member)}
            </details>
        </article>
    );
}
