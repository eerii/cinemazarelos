import styled from 'styled-components'

export const NavStyle = styled.div`
    margin: 0;
    padding: 0 32px;
    height: 64px;

    background-color: ${ props => props.theme.colors.dark_background };

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const NavLogo = styled.h1`
    margin: 0 16px;

    color: ${ props => props.theme.colors.secondary };
`;

export const NavLinks = styled.div`
    display: flex;
`;

export const NavItem = styled.a`
    margin: 0 16px;

    color: ${ props => props.theme.colors.secondary };

    display: flex;
`;