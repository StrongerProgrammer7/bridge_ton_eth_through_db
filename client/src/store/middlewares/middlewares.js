
export const asyncActionsMiddleware =
    (store) => (next) => (action) =>
    {
        if (typeof action === 'function')
        {
            console.log('ASYNC FUNCTION EXECUTION..', typeof action);
            return action(store.dispatch, store.getState);
        }
        return next(action);
    };

export const loggerMiddleware =
    (store) => (next) => (action) =>
    {
        const myAction = action;
        console.groupCollapsed('despatching', myAction.type || typeof myAction);
        console.log('Prev state', store.getState());
        console.log('Action', action);
        const result = next(action);
        console.log('Next state', store.getState());
        console.groupEnd();
        return result;
    };