import styled from 'styled-components';

export const AutocompleteContainer = styled.div`
    width: 100%;
    position: relative;
    display: inline-block;
`;

export const InputWrapper = styled.div`
    position: relative;

    > svg {
        position: absolute;
        right: 20px;
        top: 10px;
    }
`;

export const Input = styled.input`
    width: 100% !important;
    padding: 12px;
    width: 200px;
    border-radius: 4px;
    font-size: 14px;

    &:focus {
        outline: none;
    }
`;

export const SuggestionsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 400px;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid #ddd;
`;

export const SuggestionItem = styled.li`
    padding: 8px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;
