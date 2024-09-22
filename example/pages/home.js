import header from "../components/header.js";
import main from "../components/main.js";
import footer from "../components/footer.js";

const app = () => {
    const component = `
        <mini> 
            <section className="todoapp" id="root">
                <Header />
                <Main />
                <Footer />
            </section>
            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>Created by the TodoMVC Team</p>
                <p>Part of<a href="http://todomvc.com">TodoMVC </a></p>
            </footer>
        </mini>
    `

    const context = {
        App: () => component,
        ...header(),
        ...main(),
        ...footer(),
    }
    return context;
}

export default app;