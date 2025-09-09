import { renderHook, act } from '@testing-library/react';
import useAppState from './useAppState';

describe('useAppState', () => {
    let result;

    beforeEach(() => {
        const { result: hookResult } = renderHook(() => useAppState());
        result = hookResult;
    });

    describe('Initial State', () => {
        it('should return initial state with correct structure', () => {
            const [state] = result.current;

            expect(state).toEqual({
                handleOne: { x: 0.25, y: 0.25 },
                handleTwo: { x: 0.75, y: 0.75 },
                animationSpeed: 2,
                infoOpen: false
            });
        });

        it('should return a dispatch function', () => {
            const [, dispatch] = result.current;

            expect(typeof dispatch).toBe('function');
        });
    });

    describe('handleOne action', () => {
        it('should update handleOne coordinates with proper transformation', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({
                    type: 'handleOne',
                    x: 125,  // (125-25)/100 = 1.00
                    y: 175   // (-(175-275))/100 = 1.00
                });
            });

            const [state] = result.current;
            expect(state.handleOne).toEqual({ x: '1.00', y: '1.00' });
            // Other state should remain unchanged
            expect(state.handleTwo).toEqual({ x: 0.75, y: 0.75 });
            expect(state.animationSpeed).toBe(2);
            expect(state.infoOpen).toBe(false);
        });

        it('should handle edge case coordinates', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({
                    type: 'handleOne',
                    x: 25,   // (25-25)/100 = 0.00
                    y: 275   // (-(275-275))/100 = 0.00
                });
            });

            const [state] = result.current;
            expect(state.handleOne).toEqual({ x: '0.00', y: '0.00' });
        });

        it('should handle negative coordinates', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({
                    type: 'handleOne',
                    x: -25,  // (-25-25)/100 = -0.50
                    y: 325   // (-(325-275))/100 = -0.50
                });
            });

            const [state] = result.current;
            expect(state.handleOne).toEqual({ x: '-0.50', y: '-0.50' });
        });
    });

    describe('handleTwo action', () => {
        it('should update handleTwo coordinates with proper transformation', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({
                    type: 'handleTwo',
                    x: 75,   // (75-25)/100 = 0.50
                    y: 225   // (-(225-275))/100 = 0.50
                });
            });

            const [state] = result.current;
            expect(state.handleTwo).toEqual({ x: '0.50', y: '0.50' });
            // Other state should remain unchanged
            expect(state.handleOne).toEqual({ x: 0.25, y: 0.25 });
            expect(state.animationSpeed).toBe(2);
            expect(state.infoOpen).toBe(false);
        });

        it('should format coordinates to 2 decimal places', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({
                    type: 'handleTwo',
                    x: 58.333, // (58.333-25)/100 = 0.33333... -> "0.33"
                    y: 241.667 // (-(241.667-275))/100 = 0.33333... -> "0.33"
                });
            });

            const [state] = result.current;
            expect(state.handleTwo).toEqual({ x: '0.33', y: '0.33' });
        });
    });

    describe('setHandleValue action', () => {
        it('should update specific coordinate of handleOne', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({
                    type: 'setHandleValue',
                    handle: 'handleOne',
                    coordinate: 'x',
                    value: '0.85'
                });
            });

            const [state] = result.current;
            expect(state.handleOne).toEqual({ x: '0.85', y: 0.25 });
            expect(state.handleTwo).toEqual({ x: 0.75, y: 0.75 });
        });

        it('should update specific coordinate of handleTwo', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({
                    type: 'setHandleValue',
                    handle: 'handleTwo',
                    coordinate: 'y',
                    value: '0.15'
                });
            });

            const [state] = result.current;
            expect(state.handleOne).toEqual({ x: 0.25, y: 0.25 });
            expect(state.handleTwo).toEqual({ x: 0.75, y: '0.15' });
        });

        it('should parse and format string values to float with 2 decimals', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({
                    type: 'setHandleValue',
                    handle: 'handleOne',
                    coordinate: 'x',
                    value: '0.123456'
                });
            });

            const [state] = result.current;
            expect(state.handleOne.x).toBe('0.12');
        });

        it('should handle numeric values', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({
                    type: 'setHandleValue',
                    handle: 'handleTwo',
                    coordinate: 'x',
                    value: 0.789
                });
            });

            const [state] = result.current;
            expect(state.handleTwo.x).toBe('0.79');
        });

        it('should preserve other coordinates when updating one', () => {
            const [, dispatch] = result.current;

            // First set both coordinates to known values
            act(() => {
                dispatch({
                    type: 'setHandleValue',
                    handle: 'handleOne',
                    coordinate: 'x',
                    value: '0.30'
                });
            });

            act(() => {
                dispatch({
                    type: 'setHandleValue',
                    handle: 'handleOne',
                    coordinate: 'y',
                    value: '0.40'
                });
            });

            // Now update just x coordinate
            act(() => {
                dispatch({
                    type: 'setHandleValue',
                    handle: 'handleOne',
                    coordinate: 'x',
                    value: '0.90'
                });
            });

            const [state] = result.current;
            expect(state.handleOne).toEqual({ x: '0.90', y: '0.40' });
        });
    });

    describe('resetHandles action', () => {
        it('should reset both handles to default positions', () => {
            const [, dispatch] = result.current;

            // First modify the handles
            act(() => {
                dispatch({ type: 'handleOne', x: 125, y: 175 });
            });
            act(() => {
                dispatch({ type: 'handleTwo', x: 75, y: 225 });
            });

            // Verify handles were modified
            let [state] = result.current;
            expect(state.handleOne).toEqual({ x: '1.00', y: '1.00' });
            expect(state.handleTwo).toEqual({ x: '0.50', y: '0.50' });

            // Reset handles
            act(() => {
                dispatch({ type: 'resetHandles' });
            });

            [state] = result.current;
            expect(state.handleOne).toEqual({ x: 0.25, y: 0.25 });
            expect(state.handleTwo).toEqual({ x: 0.75, y: 0.75 });

            // Other state should remain unchanged
            expect(state.animationSpeed).toBe(2);
            expect(state.infoOpen).toBe(false);
        });

        it('should not affect other state properties', () => {
            const [, dispatch] = result.current;

            // Modify other state properties
            act(() => {
                dispatch({ type: 'changeAnimationSpeed', speed: 5 });
            });
            act(() => {
                dispatch({ type: 'toggleInfo' });
            });

            // Reset handles
            act(() => {
                dispatch({ type: 'resetHandles' });
            });

            const [state] = result.current;
            expect(state.handleOne).toEqual({ x: 0.25, y: 0.25 });
            expect(state.handleTwo).toEqual({ x: 0.75, y: 0.75 });
            expect(state.animationSpeed).toBe(5);
            expect(state.infoOpen).toBe(true);
        });
    });

    describe('changeAnimationSpeed action', () => {
        it('should update animation speed', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({ type: 'changeAnimationSpeed', speed: 10 });
            });

            const [state] = result.current;
            expect(state.animationSpeed).toBe(10);

            // Other state should remain unchanged
            expect(state.handleOne).toEqual({ x: 0.25, y: 0.25 });
            expect(state.handleTwo).toEqual({ x: 0.75, y: 0.75 });
            expect(state.infoOpen).toBe(false);
        });

        it('should handle decimal animation speeds', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({ type: 'changeAnimationSpeed', speed: 0.5 });
            });

            const [state] = result.current;
            expect(state.animationSpeed).toBe(0.5);
        });

        it('should handle zero animation speed', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({ type: 'changeAnimationSpeed', speed: 0 });
            });

            const [state] = result.current;
            expect(state.animationSpeed).toBe(0);
        });
    });

    describe('toggleInfo action', () => {
        it('should toggle infoOpen from false to true', () => {
            const [, dispatch] = result.current;

            // Initially false
            let [state] = result.current;
            expect(state.infoOpen).toBe(false);

            act(() => {
                dispatch({ type: 'toggleInfo' });
            });

            [state] = result.current;
            expect(state.infoOpen).toBe(true);
        });

        it('should toggle infoOpen from true to false', () => {
            const [, dispatch] = result.current;

            // First toggle to true
            act(() => {
                dispatch({ type: 'toggleInfo' });
            });

            let [state] = result.current;
            expect(state.infoOpen).toBe(true);

            // Then toggle back to false
            act(() => {
                dispatch({ type: 'toggleInfo' });
            });

            [state] = result.current;
            expect(state.infoOpen).toBe(false);
        });

        it('should not affect other state properties', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({ type: 'toggleInfo' });
            });

            const [state] = result.current;
            expect(state.infoOpen).toBe(true);
            expect(state.handleOne).toEqual({ x: 0.25, y: 0.25 });
            expect(state.handleTwo).toEqual({ x: 0.75, y: 0.75 });
            expect(state.animationSpeed).toBe(2);
        });

        it('should toggle correctly multiple times', () => {
            const [, dispatch] = result.current;

            // Start with false, toggle 3 times
            act(() => {
                dispatch({ type: 'toggleInfo' });
            });

            let [state] = result.current;
            expect(state.infoOpen).toBe(true);

            act(() => {
                dispatch({ type: 'toggleInfo' });
            });

            [state] = result.current;
            expect(state.infoOpen).toBe(false);

            act(() => {
                dispatch({ type: 'toggleInfo' });
            });

            [state] = result.current;
            expect(state.infoOpen).toBe(true);
        });
    });

    describe('Error handling', () => {
        it('should throw error for unknown action type', () => {
            const [, dispatch] = result.current;

            // Mock console.log to verify error logging
            const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

            expect(() => {
                act(() => {
                    dispatch({ type: 'unknownAction', data: 'test' });
                });
            }).toThrow();

            expect(consoleLogSpy).toHaveBeenCalledWith('wowee an error', { type: 'unknownAction', data: 'test' });

            consoleLogSpy.mockRestore();
        });

        it('should log action details before throwing error', () => {
            const [, dispatch] = result.current;
            const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

            try {
                act(() => {
                    dispatch({ type: 'invalidAction', someData: 'value' });
                });
            } catch (error) {
                // Expected to throw
            }

            expect(consoleLogSpy).toHaveBeenCalledWith('wowee an error', {
                type: 'invalidAction',
                someData: 'value'
            });

            consoleLogSpy.mockRestore();
        });
    });

    describe('Complex state updates', () => {
        it('should handle multiple sequential updates correctly', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({ type: 'changeAnimationSpeed', speed: 5 });
                dispatch({ type: 'toggleInfo' });
                dispatch({ type: 'handleOne', x: 50, y: 250 });
                dispatch({ type: 'handleTwo', x: 100, y: 200 });
            });

            const [state] = result.current;
            expect(state).toEqual({
                handleOne: { x: '0.25', y: '0.25' },
                handleTwo: { x: '0.75', y: '0.75' },
                animationSpeed: 5,
                infoOpen: true
            });
        });

        it('should maintain state consistency across different action types', () => {
            const [, dispatch] = result.current;

            // Set up a complex state
            act(() => {
                dispatch({ type: 'handleOne', x: 75, y: 225 });
            });
            act(() => {
                dispatch({ type: 'setHandleValue', handle: 'handleTwo', coordinate: 'x', value: '0.33' });
            });
            act(() => {
                dispatch({ type: 'changeAnimationSpeed', speed: 7 });
            });
            act(() => {
                dispatch({ type: 'toggleInfo' });
            });

            const [state] = result.current;
            expect(state).toEqual({
                handleOne: { x: '0.50', y: '0.50' },
                handleTwo: { x: '0.33', y: 0.75 },
                animationSpeed: 7,
                infoOpen: true
            });

            // Reset handles should only affect handles
            act(() => {
                dispatch({ type: 'resetHandles' });
            });

            const [finalState] = result.current;
            expect(finalState).toEqual({
                handleOne: { x: 0.25, y: 0.25 },
                handleTwo: { x: 0.75, y: 0.75 },
                animationSpeed: 7,
                infoOpen: true
            });
        });
    });

    describe('Edge cases and boundary values', () => {
        it('should handle very large coordinate values', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({ type: 'handleOne', x: 1025, y: -725 });
            });

            const [state] = result.current;
            expect(state.handleOne).toEqual({ x: '10.00', y: '10.00' });
        });

        it('should handle very small decimal values in setHandleValue', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({
                    type: 'setHandleValue',
                    handle: 'handleOne',
                    coordinate: 'x',
                    value: '0.001'
                });
            });

            const [state] = result.current;
            expect(state.handleOne.x).toBe('0.00');
        });

        it('should handle negative animation speeds', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({ type: 'changeAnimationSpeed', speed: -2 });
            });

            const [state] = result.current;
            expect(state.animationSpeed).toBe(-2);
        });

        it('should handle string values that parse to numbers', () => {
            const [, dispatch] = result.current;

            act(() => {
                dispatch({ type: 'changeAnimationSpeed', speed: '3.14' });
            });

            const [state] = result.current;
            expect(state.animationSpeed).toBe('3.14');
        });
    });
});
