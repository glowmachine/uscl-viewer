import getDateDiff from "../util/getDateDiff";
import { type DataType } from "../api/fetchData";

interface DataTableRowProps { member: DataType }

export default function DataTableRow({ member }: DataTableRowProps) {
    const currentTerm = member.terms[0];
    return <>
        <tr key={member.id.govtrack ? member.id.govtrack : member.id.bioguide}>
            <td>
                {`${currentTerm.state}`}
            </td>
            <td>
                {`${currentTerm.type == 'rep' ? 'Representative' : 'Senator'}`}
            </td>
            <td>{`${member.name.first} ${member.name.last}
                (${member.bio.birthday ? getDateDiff(new Date(member.bio.birthday)).years : null}
                ${member.bio.gender})
            `}</td>
            <td>{`${currentTerm.party},
                ${member.terms.length}${String(member.terms.length).endsWith('1') ? 'st'
                    : String(member.terms.length).endsWith('2') ? 'nd'
                        : String(member.terms.length).endsWith('3') ? 'rd' : 'th'} term
            `}</td>
        </tr>
    </>
}