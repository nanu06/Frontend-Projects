import search from '../assets/search.png';
import todo from '../assets/todo.png';
import calculator from '../assets/calculator.png';
import wether from '../assets/wether.png';
import ecommerce from '../assets/ecommerce.png';
import form from '../assets/form.png';
import pagination from '../assets/pagination.png';
import chatApp from '../assets/chatApp.png'
const projects = [
  {
    id: 1,
    title: "Search App",
    description: "A product search application using React and Tailwind CSS.",
    image: search,
    src: "/search",
  },
  {
    id: 2,
    title: "Todo App",
    description:
      "A simple todo application built with React and Tailwind CSS for managing tasks.",
    image: todo,
    src: "/todo",
  },
  {
    id: 3,
    title: "Calculator App",
    description:
      "A basic calculator application implemented using React and styled with Tailwind CSS.",
    image: calculator,
    src: "/calculator",
  },
  {
    id: 4,
    title: "Weather App",
    description:
      "An application to display weather information using React and styled with Tailwind CSS.",
    image: wether,
    src: "/wether",
  },
  {
    id: 5,
    title: "Shopping Cart",
    description:
      "A simple shopping cart application developed with React and Tailwind CSS.",
    image: ecommerce,
    src: "/ecommerce",
  },
  {
    id: 6,
    title: "Form with Validation",
    description:
      "A form application with validation features built using React and Tailwind CSS.",
    image: form,
    src: "/form",
  },

  {
    id: 7,
    title: "Pagination",
    description:
      "An pagination application created with React and styled using Tailwind CSS.",
    image: pagination,
    src: "/pagination",
  },
  {
    id: 8,
    title: "Chat App",
    description:
      "An chat application created with React and styled using Tailwind CSS.",
    image: chatApp,
    src: "/chatApp",
  },
];

export default projects;

// 1. Todo List Application
// Requirements: Implement a todo list with functionality to add, edit, delete, and mark todos as completed.
// Skills Tested: State management, component lifecycle, form handling.
// 2. Search Filter Component
// Requirements: Create a searchable list that filters items based on user input. This could include fetching data from an API.
// Skills Tested: Handling user input, API calls, filtering logic.
// 3. Weather App
// Requirements: Build an app that fetches and displays weather data based on user input for city names.
// Skills Tested: API integration, state management, conditional rendering.
// 4. Shopping Cart
// Requirements: Implement a simple shopping cart where users can add items, view the cart, update quantities, and see the total price.
// Skills Tested: State management, form handling, basic e-commerce logic.
// 5. Form with Validation
// Requirements: Create a form with various input fields and implement validation for each field.
// Skills Tested: Form handling, validation, state management.
// 7. Chat Application
// Requirements: Implement a basic chat interface where messages can be sent and received.
// Skills Tested: Real-time data handling (using websockets or mock data), state management.
// 8. Pagination Component
// Requirements: Create a list that supports pagination, fetching data for each page from an API.
// Skills Tested: API integration, state management, pagination logic.
