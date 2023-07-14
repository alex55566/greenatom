import { Main } from "../pages/Main"
import { Articles } from "../pages/Articles"
import { Article } from "../pages/Article"
import { CreateArticle } from "../pages/CreateArticle"

export const routes = [
    { path: '/main', element: <Main />, exact: true },
    { path: '/articles', element: <Articles />, exact: true },
    { path: '/create', element: <CreateArticle />, exact: true },
    { path: '/article/:id', element: <Article />, exact: true },
]