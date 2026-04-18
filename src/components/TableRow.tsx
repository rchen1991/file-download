import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"


type TableRowProps = {
    name?: string,
    device?: string,
    path?: string,
    status?: string,
    isSelected?: boolean,
    index: number,
    onSelect: (index: number) => void,
}

export default function TableRow({
    name,
    device,
    path,
    status,
    index,
    isSelected,
    onSelect
}: TableRowProps) {

    return (
      <tr onClick={() => {onSelect(index)}}>
        <th>
          <input type="checkbox" checked={isSelected} />
        </th>
        <td>
          {name}
        </td>
        <td>
          {device}
        </td>
        <td>
          {path}
        </td>
        <td>
          {status === "available" ? (<span>*</span>) : null}
          {capitalizeFirstLetter(status ?? "")}
        </td>
      </tr>
    )

}