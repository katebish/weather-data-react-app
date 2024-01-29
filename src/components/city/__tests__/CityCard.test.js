import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CityCard from '../CityCard';

const mockProps = {
    name: 'London',
    description: 'cloudy',
    temp: 12,
    feelsLike: 13,
    deleteCity: jest.fn(),
    reloadWeatherData: jest.fn()
}

const renderCityCard = additionalProps => {
    const props = { ...mockProps, ...additionalProps };
    return render(<CityCard {...props} />);
};

const queryReloadErrorMessage = () => screen.queryByText('Failed to reload');

describe('<CityCard />', () => {
    it('matches snapshot', () => {
        const { baseElement } = renderCityCard();
        expect(baseElement).toMatchSnapshot();
    });
    it('calls deleteCity on clicking delete button', () => {
        renderCityCard();
        userEvent.click(screen.getByTestId('delete_button'));
        expect(mockProps.deleteCity).toHaveBeenCalled();
    });
    it('calls reloadWeatherData on clicking delete button', () => {
        renderCityCard();
        userEvent.click(screen.getByTestId('reload_button'));
        expect(mockProps.reloadWeatherData).toHaveBeenCalled();
    });
    it('does not render "Failed to reload" error message if reloadError is false', () => {
        renderCityCard({ reloadError: false });
        expect(queryReloadErrorMessage()).not.toBeInTheDocument();
    });
    it('renders "Failed to reload" error message with red text color if reloadError is true', () => {
        renderCityCard({ reloadError: true });
        const reloadErrorMessage = queryReloadErrorMessage();
        expect(reloadErrorMessage).toBeInTheDocument();
        expect(reloadErrorMessage).toHaveStyle({ color: 'red' });
    });
});
