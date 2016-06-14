import React from 'react'
import Link from 'react-router/lib/Link'
import Navbar, { Header, Brand } from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'
import IndexLinkContainer from 'react-router-bootstrap/lib/IndexLinkContainer'
import Logo from 'react-icons/lib/ti/globe'

const TopNav = () => (
	<Navbar>
		<Header>
			<Brand>
				<Link to="/posts"><span className="icon"><Logo /></span> Onix</Link>
			</Brand>
		</Header>
		<Nav>
			<LinkContainer to="/posts/new">
				<NavItem eventKey={1}>New Post</NavItem>
			</LinkContainer>
			<IndexLinkContainer to="/posts">
				<NavItem eventKey={2}>Posts</NavItem>
			</IndexLinkContainer>
			<LinkContainer to="/tags">
				<NavItem eventKey={3}>Tags</NavItem>
			</LinkContainer>
		</Nav>
		<Nav pullRight>
			<LinkContainer to="/settings">
				<NavItem eventKey={4}>Settings</NavItem>
			</LinkContainer>
			<NavDropdown eventKey={5} title="User" id="usermenu">
				<LinkContainer to="/account">
					<MenuItem eventKey={5.1}>Change Password</MenuItem>
				</LinkContainer>
				<LinkContainer to="/logout">
					<MenuItem eventKey={5.2}>Log out</MenuItem>
				</LinkContainer>
			</NavDropdown>
		</Nav>
	</Navbar>
)

export default TopNav
