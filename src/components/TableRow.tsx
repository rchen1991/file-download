import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter"

import '../styles/TableRow.css'

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

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      onSelect(index);
    }
  }
  

  return (
    <tr
      key={`${name}-${device}`}
      className={`table-row ${isSelected ? 'selected' : ''}`}
      onClick={() => {onSelect(index)}}
      onKeyDown={(e) => {handleKeyDown(e, index)}}
    >
      <th>
        <input
          className="table-row__checkbox"
          type="checkbox"
          checked={isSelected}
          readOnly
        />
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