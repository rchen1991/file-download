import { render } from 'vitest-browser-react'
import { expect, test } from 'vitest'
import TableRow from './TableRow'

test('renders table row component ', async () => {
  const TableRowComponent = await render(<TableRow 
    name={'TestName'}
    device={'TestDevice'}
    path={'/test/path'}
    status={'scheduled'}
    isSelected={false}
    index={0}
    onSelect={() =>{}}
  />)

  await expect.element(TableRowComponent.getByText('TestName')).toBeVisible()
  await expect.element(TableRowComponent.getByText('TestDevice')).toBeVisible()
  await expect.element(TableRowComponent.getByText('/test/path')).toBeVisible()
  await expect.element(TableRowComponent.getByText('Scheduled')).toBeVisible()
})

test('shows indicator when status is available', async () => {                                                                                                        
  const TableRowComponent = await render(<TableRow 
    name={'TestName'}
    device={'TestDevice'}
    path={'TestPath'}
    status={'available'}
    isSelected={false}
    index={0}
    onSelect={() =>{}}
  />)                                                                                           
                                                                                                                                                                                   
  await expect.element(TableRowComponent.getByRole('img')).toBeVisible()                                                                                                                           
}) 