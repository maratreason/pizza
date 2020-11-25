import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import { Header } from "./components";
import { Home, Cart } from "./pages";
// import { setPizzas as setPizzasAction } from "./redux/actions/pizzas";
import { setPizzas } from "./redux/actions/pizzas";
import {connect} from "react-redux";

class App extends Component {
    componentDidMount() {
        axios.get("http://localhost:3000/db.json").then(({data}) => {
            this.props.setPizzas(data.pizzas);
        })
    }
    render() {
        return (
            <div className="wrapper">
                <Header />
                <div className="content">
                    <Route exact path="/" render={() => <Home items={this.props.items} />} />
                    <Route exact path="/cart" component={Cart} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.pizzas.items,
        filters: state.filters
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setPizzas: (items) => dispatch(setPizzasAction(items))
//     }
// }

export default connect(mapStateToProps, { setPizzas })(App);
