import React from 'react';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';

import Icon from '../components/Icon';

let mainmenu = [{
	title: 'Dashboard',
	link: '/',
	icon: 'dashboard',
	index: true
}, {
	title: 'New Content',
	link: '/content/new',
	icon: 'pencil'
}, {
	title: 'Content',
	link: '/content',
	icon: 'subject',
	index: true
}, {
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
const SideNav = () => (
	<div id="sidenav">
		<header>
			<div className="logo">O<small>nix.</small></div>
		</header>
		<div className="scrollable">
			<section>
				<h5>MAIN MENU</h5>
				<ul className="nav nav-pills nav-stacked">
					{mainmenu.map((item, key) => {
						if (item.index) {
							return (
								<li key={key} className="nav-item">
									<IndexLink
										to={item.link}
										className="nav-link"
										activeClassName="active"
									>
										<Icon name={item.icon} size="16" /> {item.title}
									</IndexLink>
								</li>
							);
						} else {
							return (
								<li key={key} className="nav-item">
									<Link
										to={item.link}
										className="nav-link"
										activeClassName="active"
									>
										<Icon name={item.icon} size="16" /> {item.title}
									</Link>
								</li>
							);
						}
					})}
				</ul>
			</section>
			<section>
				<h5>SETTINGS</h5>
				<ul className="nav nav-pills nav-stacked">
					{settings.map((item, key) => {
						return (
							<li key={key} className="nav-item">
								<Link
									to={item.link}
									className="nav-link"
									activeClassName="active"
								>
									<Icon name={item.icon} size="16" /> {item.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</section>
		</div>
	</div>
);

export default SideNav;