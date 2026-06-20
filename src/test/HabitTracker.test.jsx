import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

// Mock framer-motion to avoid animation complexity in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      const { initial, animate, exit, transition, whileInView, viewport, whileTap, whileHover, layout, layoutId, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    button: ({ children, ...props }) => {
      const { initial, animate, exit, transition, whileInView, viewport, whileTap, whileHover, layout, layoutId, ...rest } = props;
      return <button {...rest}>{children}</button>;
    },
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useReducedMotion: () => false,
}));

// Mock the store
const mockLogAction = vi.fn();
const mockStore = {
  logAction: mockLogAction,
  habitLog: {},
  todayBreakdown: { transport: 0, diet: 0, energy: 0 },
  streak: 5,
};

vi.mock('../context/useStore', () => ({
  default: (selector) => selector(mockStore),
}));

// Import after mocks
import HabitTracker from '../pages/HabitTracker';

function renderWithRouter(component) {
  return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe('HabitTracker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all 8 quick action buttons', () => {
    renderWithRouter(<HabitTracker />);
    const expectedLabels = ['Took Transit', 'Biked/Walked', 'Plant-Based Meal', 'Bought Local', 'AC/Heat Off', 'Cold Wash', 'Used Reusables', 'Composted'];
    expectedLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders saving amounts for each action', () => {
    renderWithRouter(<HabitTracker />);
    expect(screen.getByText('-2.4 kg')).toBeInTheDocument();
    expect(screen.getByText('-1.8 kg')).toBeInTheDocument();
    expect(screen.getByText('-1.5 kg')).toBeInTheDocument();
  });

  it('calls logAction when a quick action button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<HabitTracker />);

    const transitButton = screen.getByText('Took Transit').closest('button');
    await user.click(transitButton);

    expect(mockLogAction).toHaveBeenCalledTimes(1);
    expect(mockLogAction).toHaveBeenCalledWith('transit', 2.4, 'transport');
  });

  it('displays the streak value', () => {
    renderWithRouter(<HabitTracker />);
    expect(screen.getByText('Current Streak')).toBeInTheDocument();
    expect(screen.getByText(/5 🔥/)).toBeInTheDocument();
  });

  it('renders the page header', () => {
    renderWithRouter(<HabitTracker />);
    expect(screen.getByText('Habit Tracker')).toBeInTheDocument();
  });
});
