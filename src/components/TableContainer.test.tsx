import { render } from 'vitest-browser-react'
import { expect, test, vi } from 'vitest'
import TableContainer from './TableContainer'

import DATA from '../constants/data';

test('renders table container component ', async () => {
  const TableContainerComponent = await render(<TableContainer
    data={DATA}
  />)

  await expect.element(TableContainerComponent.getByText('None Selected')).toBeVisible()
  await expect.element(TableContainerComponent.getByText('Download Selected')).toBeVisible()
  await expect.element(TableContainerComponent.getByText('Mario')).toBeVisible()
})

test('select all checkbox selects all rows', async () => {
  const TableContainerComponent = await render(<TableContainer
    data={DATA}
  />)

  await TableContainerComponent.getByLabelText('None Selected').click()

  await expect.element(TableContainerComponent.getByText(`Selected ${DATA.length}`)).toBeVisible()
})

test('select all checkbox deselects all rows when all are selected', async () => {
  const TableContainerComponent = await render(<TableContainer
    data={DATA}
  />)

  await TableContainerComponent.getByLabelText('None Selected').click()
  await TableContainerComponent.getByLabelText(`Selected ${DATA.length}`).click()

  await expect.element(TableContainerComponent.getByText('None Selected')).toBeVisible()
})

test('download selected button is disabled when nothing is selected', async () => {
  const TableContainerComponent = await render(<TableContainer
    data={DATA}
  />)

  await expect.element(TableContainerComponent.getByRole('button', { name: 'Download Selected' })).toBeDisabled()
})

test('download selected button is enabled after selecting rows', async () => {
  const TableContainerComponent = await render(<TableContainer
    data={DATA}
  />)

  await TableContainerComponent.getByLabelText('None Selected').click()

  await expect.element(TableContainerComponent.getByRole('button', { name: 'Download Selected' })).toBeEnabled()
})

test('download selected alerts with available and scheduled items', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
  const TableContainerComponent = await render(<TableContainer
    data={DATA}
  />)

  await TableContainerComponent.getByLabelText('None Selected').click()
  await TableContainerComponent.getByRole('button', { name: 'Download Selected' }).click()

  expect(alertSpy).toHaveBeenCalledOnce()
  const alertMessage = alertSpy.mock.calls[0][0] as string
  expect(alertMessage).toContain('Available for download')
  expect(alertMessage).toContain('Scheduled but not availble for download')

  alertSpy.mockRestore()
})

