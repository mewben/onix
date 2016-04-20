import React from 'react';
import Link from 'react-router/lib/Link';

const Navbar = () => (
	<nav className="navbar navbar-light bg-faded">
		<Link to="/" className="navbar-brand">Onix</Link>
		<div className="nav navbar-nav">
			<Link to="/posts/new" className="nav-item nav-link" activeClassName="active">New Post</Link>
			<Link to="/posts" className="nav-item nav-link" activeClassName="active">Posts</Link>
			<Link to="/tags" className="nav-item nav-link" activeClassName="active">Tags</Link>
		</div>
		<div className="nav navbar-nav pull-xs-right">
			<Link to="/logout" className="nav-item nav-link">Log out</Link>
		</div>
	</nav>
);

/*
const TopNav = () => (
	<header className="header">
		<div className="container is-fluid">
			<div className="header-left">
				<Link to="/" className="header-item"><h1 className="title is-3">Onix</h1></Link>
				<Link to="/posts/new" className="header-tab" activeClassName="is-active">New Post</Link>
				<Link to="/posts" className="header-tab" activeClassName="is-active">Posts</Link>
				<Link to="/tags" className="header-tab" activeClassName="is-active">Tags</Link>
			</div>
			<div className="header-right header-menu">
				<Link to="/logout" className="header-item">Log out</Link>
			</div>
		</div>
	</header>
);
*/

export default Navbar;
