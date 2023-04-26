import React from "react";
import './CommonView.scss';
import { Header } from "../Header/Header";
import { EntryForm } from "../EntryForm/EntryForm";
import { Footer } from "../Footer/Footer";

export const CommonView = () => {
    return (
        <div className="general">
        Launching Chatter !!!
        <Header />
        <EntryForm />
        <Footer />
        </div>
    )
}