import getDateDiff from "../util/getDateDiff";
import { type DataType } from "../api/fetchData";
import getOrdinal from "../util/getOrdinal";

interface DataTableRowProps { member: DataType }

export default function DataTableRow({ member }: DataTableRowProps) {
    const currentTerm = member.terms[member.terms.length - 1];
    return <>
        <tr className='even:bg-gray-100 hover:bg-gray-200 *:p-1 *:whitespace-nowrap'
            key={member.id.bioguide ? member.id.bioguide : member.id.govtrack}
        >
            <td><a href='' className='hover:underline'>
                {member.name.first}
            </a></td>
            <td><a href='' className='hover:underline'>
                {member.name.last}
            </a></td>
            <td>{member.bio.birthday ? getDateDiff(new Date(member.bio.birthday)).years : null}</td>
            <td>{member.bio.gender}</td>
            <td>{`${currentTerm.type == 'rep' ? 'Rep' : 'Sen'}`}</td>
            <td>{currentTerm.state}</td>
            <td>{currentTerm.district}</td>
            <td>{currentTerm.party}</td>
            <td>{getOrdinal(member.terms.length)}</td>
            <td>{currentTerm.start}</td>
            <td>{currentTerm.end}</td>
            <td></td>
        </tr>
    </>
}