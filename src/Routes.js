import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { RecipeListPage } from './pages/RecipeListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { RecipeCreatePage } from './pages/RecipeCreatePage';
import { RecipeEditPage } from './pages/RecipeEditPage';

export function Routes() {
  return (
    <RouterRoutes>
      <Route index element={<RecipeListPage />} />
      <Route path="/recipe/:slug" element={<RecipeDetailPage />} />
      <Route path="/edit/:slug" element={<RecipeEditPage />} />
      <Route path="/new" element={<RecipeCreatePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
}
