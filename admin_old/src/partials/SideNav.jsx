import React, { Component } from 'react';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';

import Icon from '../components/Icon';

class SideNav extends Component {

	render() {
		let menu = [{
			title: 'Tags',
			link: '/tags',
			icon: 'label'
		}];

		let settings = [{
			title: 'General',
			link: '/settings',
			icon: 'gear'
		}, {
			title: 'Themes',
			link: '/themes',
			icon: 'style'
		}, {
			title: 'Code Injection',
			link: '/code',
			icon: 'code'
		}];

		return (
			<div id="sidenav">
				<header>
					<div className="logo">
						<Icon name="logo" size="28" />
					</div>
					<div id="brand">Onix</div>
				</header>
				<div className="scrollable">
					<h5>MAIN MENU</h5>
					<ul className="nav nav-pills nav-stacked">
						<li className="nav-item">
							<IndexLink
								to="/"
								className="nav-link"
								activeClassName="active"
							>
								<Icon name="dashboard" size="16" /> Dashboard
							</IndexLink>
						</li>
						<li className="nav-item">
							<Link
								to="/content/new"
								className="nav-link"
								activeClassName="active"
							>
								<Icon name="pencil" size="16" /> New Content
							</Link>
						</li>
						<li className="nav-item">
							<IndexLink
								to="/content"
								className="nav-link"
								activeClassName="active"
							>
								<Icon name="subject" size="16" /> Content
							</IndexLink>
						</li>
						{menu.map((m, i) => {
							return (
								<li key={i} className="nav-item">
									<Link
										to={m.link}
										className="nav-link"
										activeClassName="active"
									>
										<Icon name={m.icon} size="16" /> {m.title}
									</Link>
								</li>
							);
						})}
					</ul>
					<h5>SETTINGS</h5>
					<ul className="nav nav-pills nav-stacked">
						{settings.map((m, i) => {
							return (
								<li key={i} className="nav-item">
									<Link
										to={m.link}
										className="nav-link"
										activeClassName="active"
									>
										<Icon name={m.icon} size="16" /> {m.title}
									</Link>
								</li>
							);
						})}
					</ul>
					<h5>ACCOUNT</h5>
					<ul className="nav nav-pills nav-stacked">
						<li className="nav-item"><Link to="/me" className="nav-link" activeClassName="active"><Icon name="person" size="16" /> My Profile</Link></li>
						<li className="nav-item"><Link to="/logout" className="nav-link"><Icon name="power" size="16" /> Log out</Link></li>
					</ul>
				</div>
			</div>
		);
	}
}

export default SideNav;
