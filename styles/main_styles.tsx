import styled from 'styled-components'

export const Title = styled.h1`
    font-size: 50px;
    text-align: center;
    color: ${ props => props.theme.colors.secondary };
`;

export const PlaceholderMovie = styled.div`
    background-color: ${ props => props.theme.colors.dark_background };  
`;