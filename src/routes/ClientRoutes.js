import NotFound from 'components/NotFound';
import BlogDetail from 'features/blog/pages/BlogDetail';
import BlogClient from 'features/blog/pages/client/BlogClient';
import CreateBlog from 'features/blog/pages/CreateBlog';
import CoursesList from 'features/course/client/CoursesList';
import Problem from 'features/problem/Problem';
import Rank from 'features/rank/Rank';
// import Rank from 'features/rank/Rank';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import ProblemSolve from '../components/ProblemSolve';
import ContentContest from '../features/contest/info/ContentContest';
import Contest from '../features/contest/pages/Contest';
import ComingSoon from 'components/ComingSoon';
import CourseDetail from 'features/course/client/CourseDetail';

export function ClientRoutes() {
  return (
    <Switch>
      <Route path="/" element={<Navigate to="/course" />} />
      <Route path="/course">
        <Route index element={<CoursesList />} />
      </Route>
      <Route path="/problem">
        <Route index element={<Problem />} />
        <Route path=":id" element={<ProblemSolve />} />
      </Route>

      <Route path="/contest">
        <Route index element={<Contest />} />
        <Route path=":id" element={<ContentContest />} />
      </Route>

      <Route path="/blog">
        <Route index element={<BlogClient />} />
        <Route path=":id" element={<BlogDetail />} />
        <Route path="create" element={<CreateBlog />} />
      </Route>

      <Route path="/rank" element={<ComingSoon />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/course" element={<CoursesList />} />
      <Route path="/course/:id" element={<CourseDetail />} />
    </Switch>
  );
}
