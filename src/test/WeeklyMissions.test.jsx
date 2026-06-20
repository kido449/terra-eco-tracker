import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      const { initial, animate, exit, transition, whileInView, viewport, whileTap, whileHover, layout, layoutId, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useReducedMotion: () => false,
}));

// Mock the store
const mockCompleteMission = vi.fn();
const mockStore = {
  completedMissions: [],
  completeMission: mockCompleteMission,
  ecoScore: 42,
};

vi.mock('../context/useStore', () => ({
  default: (selector) => selector(mockStore),
}));

import WeeklyMissions from '../pages/WeeklyMissions';

function renderWithRouter(component) {
  return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe('WeeklyMissions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.completedMissions = [];
  });

  it('renders all 7 mission titles', () => {
    renderWithRouter(<WeeklyMissions />);
    expect(screen.getByText('Meatless Monday')).toBeInTheDocument();
    expect(screen.getByText('Walk or Bike Commute')).toBeInTheDocument();
    expect(screen.getByText('Zero Food Waste Day')).toBeInTheDocument();
    expect(screen.getByText('Unplug All Phantom Loads')).toBeInTheDocument();
    expect(screen.getByText('Take a 5-Minute Shower')).toBeInTheDocument();
    expect(screen.getByText('Carry Reusables All Day')).toBeInTheDocument();
    expect(screen.getByText('Eco Knowledge Share')).toBeInTheDocument();
  });

  it('calls completeMission when checkbox is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<WeeklyMissions />);

    // Find the first checkbox by its aria-label
    const checkbox = screen.getAllByLabelText('Mark mission as complete')[0];
    await user.click(checkbox);

    expect(mockCompleteMission).toHaveBeenCalledTimes(1);
    expect(mockCompleteMission).toHaveBeenCalledWith('mission-1');
  });

  it('shows completed state for missions in completedMissions', () => {
    mockStore.completedMissions = ['mission-1'];
    renderWithRouter(<WeeklyMissions />);

    // The completed mission's checkbox should have the "Mission completed" label
    expect(screen.getByLabelText('Mission completed')).toBeInTheDocument();
    // Remaining should have "Mark mission as complete"
    expect(screen.getAllByLabelText('Mark mission as complete')).toHaveLength(6);
  });

  it('renders the page header', () => {
    renderWithRouter(<WeeklyMissions />);
    expect(screen.getByText('Weekly Missions')).toBeInTheDocument();
  });

  it('displays the current eco score', () => {
    renderWithRouter(<WeeklyMissions />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
