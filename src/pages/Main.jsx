import React from "react";
import { Quote } from "../components/Quote";
import { SearchWiki } from "../components/SearchWiki";
import { AutorizationPage } from "../components/AutorizationPage";
import { TodoList } from "../components/TodoList";

export function Main() {
    return (
        <div className="Main">
            <Quote />
            <SearchWiki />
            <AutorizationPage />
            <TodoList />
        </div>
    );
}