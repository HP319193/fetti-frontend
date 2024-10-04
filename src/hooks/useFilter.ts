import { useState, useCallback } from "react";
import useMount from "./useMount";
import moment from "moment";

interface FilterState {
  [key: string]: any;
}

const useFilter = (
  initialState: FilterState = {},
  defaultState: FilterState = {}
) => {
  const [filterState, setFilterState] = useState<FilterState>({ ...initialState });

  const [requestState, setRequestState] = useState<FilterState>(
    convertFilterStateToRequest({ ...initialState })
  );

  useMount(() => {
    validateFilterState(initialState);
  });

  const modifyFilters = useCallback(
    (filters: FilterState) => {
      const newFilters: FilterState = {
        ...filterState,
        ...removeUninitializedFilters(filters, initialState),
      };

      if (validateFilters(newFilters)) {
        setFilterState(newFilters);

        const newRequestFilters = convertFilterStateToRequest(newFilters);
        setRequestState(newRequestFilters);
        return { filterState: newFilters, requestState: newRequestFilters };
      }
      return { filterState: newFilters, requestState: null };
    },
    [filterState, initialState]
  );

  const modifyFilter = useCallback(
    (name: string, obj: { value: any }) => {
      return modifyFilters({ [name]: obj.value });
    },
    [modifyFilters]
  );

  const clearFilter = useCallback(() => {
    const is: FilterState = { ...initialState };
    if (Object.keys(defaultState).length) {
      Object.keys(defaultState).forEach((key) => {
        if (is.hasOwnProperty(key)) {
          is[key] = defaultState[key];
        }
      });
    }
    if (is.dateRange) {
      is.dateRange = [moment().startOf("day"), moment().endOf("day")];
    }
    setFilterState(is);

    const newRequestFilters = convertFilterStateToRequest(is);
    setRequestState(newRequestFilters);
    return { filterState: initialState, requestState: newRequestFilters };
  }, [initialState, defaultState]);
  return { modifyFilter, modifyFilters, clearFilter, filterState, requestState };
};

const validateFilters = (filterState: FilterState) => {
  try {
    validateFilterState(filterState);
    validatePaginationState(filterState);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const validateFilterState = (filterState: FilterState) => {
  if (!filterState) {
    throw new Error("Filter state is required when using filter hook");
  }
  if (typeof filterState !== "object") {
    throw new Error("Filter state must be an object");
  }
  if (Object.keys(filterState).length <= 0) {
    throw new Error("Filter state must have at least one property");
  }
};

const validatePaginationState = (state: FilterState) => {
  if (state.hasOwnProperty("page") || state.hasOwnProperty("page_size")) {
    if (!state?.page || typeof state?.page !== "number" || state?.page <= 0) {
      throw new Error(`Invalid page state with value ${state.page}`);
    }
    if (!state?.page_size || typeof state?.page_size !== "number" || state?.page_size <= 0) {
      throw new Error(`Invalid page size state with value of ${state.page_size}`);
    }
  }

  return true;
};

const removeUninitializedFilters = (filters: FilterState, initialState: FilterState) => {
  let newFilters: FilterState = {};
  for (const [k, filter] of Object.entries(filters)) {
    if (!initialState.hasOwnProperty(k)) {
      console.warn(
        `Filter ${k} is not declared on initial filter state. Will disregard this filter.`
      );
    } else {
      newFilters[k] = filter;
    }
  }
  return newFilters;
};

const convertFilterStateToRequest = (filterState: FilterState) => {
  let request: FilterState = {};
  for (const [k, filter] of Object.entries(filterState)) {
    if (filter !== null && filter !== undefined && filter !== "") {
      request[k] = filter;
    }
  }
  return request;
};

export default useFilter;
