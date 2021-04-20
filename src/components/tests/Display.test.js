import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import fetchShow from '../../api/fetchShow';
import Display from '../Display';

jest.mock('../../api/fetchShow');

const testData = {
    name: 'Stranger Things',
    summary: 'This show is about psychics, monsters, and D&D.',
    seasons: [
        {
            id: 0,
            name: 'Season 1',
            episodes: []
        },
        {
            id: 1,
            name: 'Season 2',
            episodes: []
        }
    ]
}

test('Display component renders without any passed in props', () => {
    render(<Display />); 
});

test('when the fetch button is pressed, the Show component will display.', async () => {
    fetchShow.mockResolvedValueOnce(testData);

    render(<Display />);

    userEvent.click(screen.getByRole('button', { name: /press to get show data/i }));

    expect(await screen.findByTestId(/show-container/i)).toBeInTheDocument();
});

test('when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.', async () => {
    fetchShow.mockResolvedValueOnce(testData);

    render(<Display />);

    userEvent.click(screen.getByRole('button', { name: /press to get show data/i }));

    expect(await screen.findAllByTestId(/season-option/i)).toHaveLength(2);
});

test('notice the optional functional prop passed in to the Display component client code - test that when the fetch button is pressed, this function is called.', async () => {
    fetchShow.mockResolvedValueOnce(testData);

    const mockDisplayFunc = jest.fn();

    render(<Display displayFunc={mockDisplayFunc} />);

    userEvent.click(screen.getByRole('button', { name: /press to get show data/i }));

    expect(await waitFor (() => mockDisplayFunc)).toHaveBeenCalled();
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
