import React from 'react';
import Link from 'next/link';
// constants
import * as C from '../../constants';
// icons
import Icon from '../../icons';
// theme
import Theme from '../../theme';
// ui
import { Box, Flex, Text, StyledLink } from '../../ui';
// feature footer
import { Nav, NavItem, StyledFooter } from './ui';
// //////////////////////////////////////////////////

const navItems = [
  {
    order: 1,
    title: 'Home',
    link: C.ROUTE_HOME_PAGE
  },
  {
    order: 3,
    title: 'About',
    link: C.ROUTE_ABOUT_PAGE
  },
  {
    order: 5,
    title: 'Shop',
    link: C.ROUTE_PATH_SHOP
  },
  {
    order: 2,
    title: 'Recipe',
    link: C.ROUTE_RECIPE_PAGE
  },
  {
    order: 4,
    title: 'Partnership',
    link: C.ROUTE_PARTNERSHIP_PAGE
  }
];

const getNavItemStyles = {
  fontSize: 18,
  fontWeight: 500,
  display: 'block',
  color: Theme.colors.quincy
};

const Footer = ({ activeNavItem, handleGoToHomePage }) => {
  const getOpacity = link => (activeNavItem(link) ? 1 : 0.5);

  return (
    <StyledFooter>
      <Icon
        iconName="logo"
        width="max-content"
        handleClick={handleGoToHomePage}
      />
      <Nav>
        <div>
          <Link href={C.ROUTE_HOME_PAGE}>
            <NavItem
              {...getNavItemStyles}
              opacity={getOpacity(C.ROUTE_HOME_PAGE)}
            >
              Home
            </NavItem>
          </Link>
          <Link href={C.ROUTE_HOME_PAGE}>
            <NavItem
              {...getNavItemStyles}
              opacity={getOpacity(C.ROUTE_RECIPE_PAGE)}
            >
              Recipe
            </NavItem>
          </Link>
          <Link href={C.ROUTE_HOME_PAGE}>
            <NavItem
              {...getNavItemStyles}
              opacity={getOpacity(C.ROUTE_ABOUT_PAGE)}
            >
              About
            </NavItem>
          </Link>
        </div>
        <div>
          <Link href={C.ROUTE_HOME_PAGE}>
            <NavItem
              {...getNavItemStyles}
              opacity={getOpacity(C.ROUTE_PARTNERSHIP_PAGE)}
            >
              Partnership
            </NavItem>
          </Link>
          <Link href={C.ROUTE_HOME_PAGE}>
            <NavItem
              {...getNavItemStyles}
              opacity={getOpacity(C.ROUTE_PATH_SHOP)}
            >
              Shop
            </NavItem>
          </Link>
        </div>
        <div>
          <Text opacity={0.5} fontSize={18}>
            Contact Us
          </Text>
          <Text py={15} opacity={0.5} fontSize={18} color={Theme.colors.quincy}>
            +38 (067) 343 45 55
          </Text>
          <Text opacity={0.5} fontSize={18} color={Theme.colors.quincy}>
            kit’s_chocolate@gmail.com
          </Text>
        </div>
      </Nav>
      <Box>
        <Flex mb={30} width={200} justifyContent="space-between">
          {C.ICON_GROUP_SOCIALS.map(({ icon, link }, index) => (
            <StyledLink key={index} href={link} target="_blank">
              <Icon iconName={icon} />
            </StyledLink>
          ))}
        </Flex>
        <Text opacity={0.5} fontSize={18} color={Theme.colors.quincy}>
          kit’schocolate.com © 2019
        </Text>
      </Box>
    </StyledFooter>
  );
};

export default Footer;
