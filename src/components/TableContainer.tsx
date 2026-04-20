import { useState, useEffect, useRef } from 'react'
import TableRow from './TableRow'
import Icon from './Icon'

import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'

import '../styles/TableContainer.css'

type TableData = {
  name: string,
  device: string,
  path: string,
  status: string,
}

type TableContainerProps = {
  data: TableData[],
}

export default function TableContainer({data}: TableContainerProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const selectAllRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const selectAllInput = selectAllRef.current;
    if (!selectAllInput) return;

    if (selected.size > 0 && selected.size < data.length) {
      selectAllInput.indeterminate = true;
      selectAllInput.checked = false;
    } else if (selected.size === data.length) {
      selectAllInput.indeterminate = false;
      selectAllInput.checked = true;
    } else {
      selectAllInput.indeterminate = false;
      selectAllInput.checked = false;
    }

  }, [selected, data.length])

  const handleSelected = (selectedRow: number) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSelectAll();
    }
  }

  const handleSelectAll = () => {
    if (selected.size === data.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(data.map((_,i) => i)))
    }
  }

  const handleDownload = () => {
    const selectedItems = data.filter((_, i) => selected.has(i));
    const available = selectedItems.filter(item => item.status === 'available');
    const scheduled = selectedItems.filter(item => item.status === 'scheduled');

    let alertString = ""

    if (available.length > 0) {
      alertString += 'Available for download: \n'
      for (let i = 0; i < available.length; i++) {
        alertString = alertString + 'Device: ' + available[i].device + '\nPath: ' + available[i].path + '\n';
      }
    }

    if (scheduled.length > 0) {
      alertString += '\nScheduled but not availble for download: \n'
      for (let j = 0; j < scheduled.length; j++) {
        alertString = alertString + 'Device: ' + scheduled[j].device + '\nPath: ' + scheduled[j].path + '\n';
      }
    }
    
    alert(alertString)
  }

  const headerNames = Object.keys(data[0]);

  return (
    <div className="table-container">
      <div className="table-container__action-bar">
        <div className="table-container__select-all">
          <input
            className='table-container__select-all-checkbox'
            type="checkbox"
            ref={selectAllRef}
            onClick={handleSelectAll}
            onKeyDown={(e) => {handleKeyDown(e)}}
            id="select-all-checkbox"
            name="select-all"
          />
          <label htmlFor="select-all-checkbox">{selected.size > 0 ? `Selected ${selected.size}` : 'None Selected'}</label>
        </div>
        <div className="table-container__download">
          <button className="table-container__download-button" onClick={handleDownload} disabled={selected.size === 0}>
            <Icon token="download" width={24} height={24} />
            <p>Download Selected</p>
          </button>
        </div>
      </div>
      <table className="table-container__table">
        <thead>
          <tr>
              <th></th>
              {headerNames.map((header) => {
              return (
                  <th key={header}>
                    {capitalizeFirstLetter(header)}
                  </th>
              )
              })}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, index) => {
              return (
                <TableRow
                  key={`${rowData.name}-${index}`}
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