import { describe, test, expect } from "vitest"
import { getByRole, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App"
import { click } from "@testing-library/user-event/dist/cjs/convenience/click.js"

describe('App', () => {

    test('user can add note', async () => {

        const user = userEvent.setup()
        
        render(<App />)

        const addButton = screen.getByRole('button', {
            name: /add note/i 
        })

        const titleInput = screen.getByRole('textbox', {
            name: /title/i
        })

        const bodyInput = screen.getByRole('textbox', {

            name: /body/i
        })

        await user.type(titleInput, 'Judo training')
        await user.type(bodyInput, 'Practice Ukemi')
        await user.click(addButton)


        expect(screen.getByText('Judo training')).toBeInTheDocument()

    })

    test('shows an error when requuired fields are empty', async () => {

        const user = userEvent.setup()

        render(<App/>)

        const addButton = screen.getByRole('button', {

            name: /add note/i
        })

        await user.click(addButton)

        expect(screen.getByText('Please fill in all the required fields')).toBeInTheDocument()
    })

    test('delete confirmation', async () => {

        const user = userEvent.setup()

        render(<App/>)
        
        const titleInput = screen.getByRole('textbox', {
            name: /title/i
        })
        
        const bodyInput = screen.getByRole('textbox', {
            
            name: /body/i
        })
        
        const addButton = screen.getByRole('button', {
                    name: /add note/i 
                })

        await user.type(titleInput, 'Judo training')
        await user.type(bodyInput, 'Practice Ukemi')
        await user.click(addButton)

        const deleteButton = screen.getByRole('button', {
            name: /Delete/i
        })

        await user.click(deleteButton)
        
        const confirmDeleteButton = await screen.findByRole('button', {
            name: /Confirm Delete/i
        })

        await user.click(confirmDeleteButton)

        expect(screen.queryByText('Judo training')).not.toBeInTheDocument()


    })
    test('Archive a note', async () => {

        const user = userEvent.setup()

        render(<App/>)

          const titleInput = screen.getByRole('textbox', {
            name: /title/i
        })
        
        const bodyInput = screen.getByRole('textbox', {
            
            name: /body/i
        })
        
        const addButton = screen.getByRole('button', {
                    name: /add note/i 
                })

        await user.type(titleInput, 'Judo training')
        await user.type(bodyInput, 'Practice Ukemi')
        await user.click(addButton)

        const archiveButton = screen.getByRole ('button', {
            name: /^Archive$/i

        })

        await user.click(archiveButton)

        expect(screen.queryByText('Judo training')).not.toBeInTheDocument()
        

        const showArchive = screen.getByRole('button', {
            name: /Show Archive/i

        })

        await user.click(showArchive)

        expect(screen.queryByText('Judo training')).toBeInTheDocument()
    })
    test('add favorite note', async () => {

        const user = userEvent.setup()

        render(<App/>)

          const titleInput = screen.getByRole('textbox', {
            name: /title/i
        })
        
        const bodyInput = screen.getByRole('textbox', {
            
            name: /body/i
        })

        const addButton = screen.getByRole('button', {
            name: /Add Note/i
        })

        await user.type(titleInput, 'Judo training')
        await user.type(bodyInput, 'Practice Ukemi')
        await user.click(addButton)

        expect(screen.getByText('Judo training')).toBeInTheDocument()

         const favoriteButton = screen.getByRole('button', {
            name: /Favorite-button/i
        })

        await user.click(favoriteButton)

        const showFavoriteButton = screen.getByRole('button', {
            name: /Show favorite Notes/i
        })

        await user.click(showFavoriteButton)

        expect(screen.queryByText('Judo training')).toBeInTheDocument()

    })
})