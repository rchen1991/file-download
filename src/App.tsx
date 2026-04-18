import { useState, useEffect, useRef } from 'react'
import TableRow from './components/TableRow'
import './App.css'

import { capitalizeFirstLetter } from './utils/capitalizeFirstLetter'

import DATA from './constants/data'

function App() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const selectAllRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const selectAllInput = selectAllRef.current;
    if (!selectAllInput) return;

    if (selected.size > 0 && selected.size < DATA.length) {
      selectAllInput.indeterminate = true;
      selectAllInput.checked = false;
    } else if (selected.size === DATA.length) {
      selectAllInput.indeterminate = false;
      selectAllInput.checked = true;
    } else {
      selectAllInput.indeterminate = false;
      selectAllInput.checked = false;
    }

  }, [selected])

  const handleSelected = (selectedRow: number) => {
    console.log(selectedRow)

    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(selectedRow)) {
        next.delete(selectedRow)
      } else {
        next.add(selectedRow)
      }

      return next;
    })
  }

  const handleSelectAll = () => {

    if (selected.size === DATA.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(DATA.map((_,i) => i)))
    }
  }

  const headerNames = Object.keys(DATA[0])

  return (
    <div>
      <div>
        <div>
          <input type="checkbox" ref={selectAllRef} onClick={handleSelectAll}/>
          <span>{selected.size > 0 ? `Selected ${selected.size}` : 'None Selected'}</span>
        </div>
        <button>Download Selected</button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            {headerNames.map((header) => {
              return (
                <th>
                  {capitalizeFirstLetter(header)}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {DATA.map((rowData, index) => {
            return (
              <TableRow
                name={rowData.name ?? ""}
                device={rowData.device ?? ""}
                path={rowData.path ?? ""}
                status={rowData.status ?? ""}
                index={index}
                isSelected={selected.has(index)}
                onSelect={handleSelected}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
