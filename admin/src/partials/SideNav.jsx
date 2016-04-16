import React from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import Link from 'react-router/lib/Link';

let mainmenu = [{
	title: 'New Post',
	link: '/posts/new'
}, {
	title: 'Posts',
	link: '/posts'
}, {
	title: 'Tags',
	link: '/tags'
}];

const SideNav = () => (
	<div id="sidenav">
		<div className="scrollable">
			<section>
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
										{item.title}
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
										{item.title}
									</Link>
								</li>
							);
						}
					})}
				</ul>
			</section>
			<section>
				<ul className="nav nav-pills nav-stacked">
					<li className="nav-item">
						<Link
							to="/logout"
							className="nav-link"
							activeClassName="active"
						>Log out</Link>
					</li>
				</ul>
			</section>
		</div>
	</div>
);

export default SideNav;
