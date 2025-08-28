🥘  Tasteorama — Culinary Recipe Management App
Tasteorama is a modern web application that allows users to create, save, view, and manage their personal recipes. Whether you're a home cook, a food blogger, or just someone who loves good food, Tasteorama is your digital cookbook.

🔧 Key Features
- 🔐 User Authentication
Secure login and registration system with access token support. Includes token refresh and logout functionality.
- 🍲 Recipe Creation
Users can add new recipes with a name, description, preparation time, photo, and ingredients.
- 💾 Personal Recipe Storage
All recipes are linked to the authenticated user. Each user can view and manage only their own recipes.
- 🗂️ Categories & Ingredients
Recipes can be filtered by category, region, and ingredients for easier discovery.
- ❤️ Favorites
Users can mark recipes as favorites for quick access later.
- 🔍 Search & Browse
Clean interface for browsing recipes, viewing details, and exploring culinary ideas.
- 📚 API Documentation (Swagger)
Developer-friendly documentation for easy integration and testing.

🚀 Technologies Used
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT + Cookies
- Documentation: Swagger UI
- Frontend: React

📁 API Overview
- POST /api/auth/register — Register a new user
- POST /api/auth/login — Log in
- GET /api/recipes/my — Retrieve user's own recipes
- POST /api/recipes — Create a new recipe
- GET /api/categories — Get available categories
- GET /api/ingredients — Get available ingredients
- POST /api/recipes/{id}/favorite — Add recipe to favorites
- GET /api/currentUser — Get current user info
