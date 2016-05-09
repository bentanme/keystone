/**
 * The primary (i.e. uppermost) navigation on desktop. Renders all sections and
 * the home-, website- and signout buttons.
 */

import React from 'react';
import { Container } from 'elemental';
import PrimaryNavItem from './NavItem';

var PrimaryNavigation = React.createClass({
	displayName: 'PrimaryNavigation',
	propTypes: {
		brand: React.PropTypes.string,
		currentSectionKey: React.PropTypes.string,
		sections: React.PropTypes.array.isRequired,
		signoutUrl: React.PropTypes.string,
	},
	getInitialState () {
		return {};
	},
	// Handle resizing, hide this navigation on mobile (i.e. < 768px) screens
	componentDidMount () {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount () {
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize () {
		this.setState({
			navIsVisible: window.innerWidth >= 768,
		});
	},
	// Render the sign out button
	renderSignout () {
		if (!this.props.signoutUrl) return null;

		return (
			<PrimaryNavItem
				label="octicon-sign-out"
				href={this.props.signoutUrl}
				title="Sign Out"
			>
				<span className="octicon octicon-sign-out" />
			</PrimaryNavItem>
		);
	},
	// Render the link to the webpage
	renderFrontLink () {
		return (
			<ul className="app-nav app-nav--primary app-nav--right">
				<PrimaryNavItem
					label="octicon-globe"
					href={Keystone.backUrl}
					title={'Front page - ' + this.props.brand}
				>
					<span className="octicon octicon-globe" />
				</PrimaryNavItem>
				{this.renderSignout()}
			</ul>
		);
	},
	renderBrand () {
		// TODO: support navbarLogo from keystone config
		return (
			<PrimaryNavItem
				label="octicon-home"
				className={this.props.currentSectionKey === 'dashboard' ? 'active' : null}
				to={Keystone.adminPath}
				title={'Dashboard - ' + this.props.brand}
			>
				<span className="octicon octicon-home" />
			</PrimaryNavItem>
		);
	},
	// Render the navigation
	renderNavigation () {
		if (!this.props.sections || !this.props.sections.length) return null;

		return this.props.sections.map((section) => {
			// Get the link and the class name
			const href = section.lists[0].external ? section.lists[0].path : `${Keystone.adminPath}/${section.lists[0].path}`;
			const className = (this.props.currentSectionKey && this.props.currentSectionKey === section.key) ? 'active' : null;

			return (
				<PrimaryNavItem
					key={section.key}
					label={section.label}
					className={className}
					to={href}
				>
					{section.label}
				</PrimaryNavItem>
			);
		});
	},
	render () {
		if (!this.state.navIsVisible) return null;

		return (
			<nav className="primary-navbar">
				<Container clearfix>
					<ul className="app-nav app-nav--primary app-nav--left">
						{this.renderBrand()}
						{this.renderNavigation()}
					</ul>
					{this.renderFrontLink()}
				</Container>
			</nav>
		);
	},
});

module.exports = PrimaryNavigation;
