import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import TodoEntry from './todoEntry';
import TodoOverview from './todoOverview';
import TodoFooter from './todoFooter';
import CountDown from './countDown';
import ReactWeather from './react_weather';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import DevTool from 'mobx-react-devtools';

@observer
export default class TodoApp extends React.Component {
	render() {
		const {todoStore, viewStore} = this.props;
		return (
			<div>
				<DevTool />
				<header className="header">
					<h1>todos</h1>
					<TodoEntry todoStore={todoStore} />
				</header>
				<TodoOverview todoStore={todoStore} viewStore={viewStore} />
				<TodoFooter todoStore={todoStore} viewStore={viewStore} />
				<CountDown startCount={10}>
					{(count) => (<p>{count === 0 ? '新年快乐' : count}</p>)}
				</CountDown>
				<ReactWeather></ReactWeather>
			</div>
		);
	}

	componentDidMount() {
		if (__CLIENT__) {
			var { Router } = require('director/build/director');
			var viewStore = this.props.viewStore;
			var router = Router({
				'/': function() { viewStore.todoFilter = ALL_TODOS; },
				'/active': function() { viewStore.todoFilter = ACTIVE_TODOS; },
				'/completed': function() { viewStore.todoFilter = COMPLETED_TODOS; }
			});
		router.init('/');
		}
	}
}

TodoApp.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
};
