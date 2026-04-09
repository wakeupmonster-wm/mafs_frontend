# FAQ Client-Side Filtering & Dynamic Categories - Documentation

This document explains the implementation of the zero-network-call filtering mechanism and dynamic category processing in the FAQ module.

## 1. Overview
The goal was to implement a performant filtering system (by search text and category) for the FAQs without triggering redundant network calls to the backend, while also dynamically rendering the category list directly from the backend's `allCategories` payload.

## 2. Redux Slice Updates (`faq.slice.js`)

**Concept:** 
Instead of only extracting the `data` array from the API response, the Redux Thunk now returns the full response object. This allows us to store both the FAQ items and the dynamically provided categories in the global state.

**Key Changes:**
- Updated the `fetchFAQs` thunk to return the entire `response` rather than `response.data`.
- Expanded the `initialState` to include an empty `categories` array.
- Updated the `extraReducers` for `fetchFAQs.fulfilled` to map the respective properties:

```javascript
// Thunk Modification
export const fetchFAQs = createAsyncThunk(
  "faqs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllFAQsAPI();
      return response.success ? response : rejectWithValue(response.message);
    } catch (error) { ... }
  }
);

// State Mapping Modification
.addCase(fetchFAQs.fulfilled, (state, action) => {
  state.items = action.payload.data || []; 
  state.categories = action.payload.allCategories || [];
})
```

## 3. Page Component Integration (`faqs.page.jsx`)

**Concept:**
The UI component subscribes to the Redux store, retrieves both `items` and `categories`, and performs all sorting and filtering purely via JavaScript array methods on the client side.

**Key Changes:**

### A. Dynamic Category Selection
The hardcoded fallback categories are strictly overridden by the categories passed down from the backend:
```javascript
const { items, categories, loading } = useSelector((state) => state.faqs);

const CATEGORIES = categories?.length > 0 ? categories : [
  "general",
  "account",
  "dating",
  // fallback items...
];
```

### B. The Client-Side Filter Engine
We utilize standard React state (`useState`) to store user inputs for the search term and the active category filter. These state variables trigger a local re-render, computing the `filtered` variable instantly from the `items` array stored in Redux memory:

```javascript
const [search, setSearch] = useState("");
const [filterCategory, setFilterCategory] = useState("all");

const filtered = items.filter((f) => {
  // 1. Check if search term matches the question or the answer
  const matchSearch =
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase());
  
  // 2. Check if the active category matches (or is set to "all")
  const matchCategory =
    filterCategory === "all" || f.category === filterCategory;
  
  return matchSearch && matchCategory;
});
```

> [!TIP]
> **Why is there no network call?** 
> The `fetchFAQs()` action is strictly encapsulated inside a `useEffect` that has `[dispatch]` as its only dependency. Therefore, `fetchFAQs` is exclusively fired on the initial component mount. Every subsequent keystroke or dropdown selection strictly evaluates the lightweight `filtered` constant in-memory.

## 4. Operational Flow
1. **Mount:** `FAQSPage` mounts `->` dispatches `fetchFAQs()` `->` API sends `{ data, allCategories }` `->` Redux saves state.
2. **User Interaction:** User types "OTP" in the search box OR selects "account" from dropdown `->` React updates local state (`search`/`filterCategory`).
3. **Instant Render:** The `filtered` mapping executes instantaneously without communicating to the API, immediately updating the Accordion list.
