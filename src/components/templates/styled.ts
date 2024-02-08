import styled from 'styled-components';

export const GraphsWrapperStyled = styled.div`
    flex: 2;

    canvas {
        width: 100% !important;
    }
`;

export const SearchBarWrapperStyled = styled.div`
    flex: 1;
    background-color: #37374a;
    padding: 50px 30px 30px 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    height: 100%;
`;

export const SearchContainerStyled = styled.div`
    width: 100%;
    background: #242432;
    color: #bcbcf2;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    text-align: center;
`;

export const InitialTextStyled = styled.p`
    font-size: 18px;
    line-height: 24px;
`;

export const RepoWrapperStyled = styled.div`
    width: 100%;
    background: #4cca8d;
    padding-left: 8px;
    border-radius: 4px;
`;

export const RemoveWrapperStyled = styled.div`
    position: absolute;
    top: 23px;
    right: 18px;
    display: none;
    cursor: pointer;
`;

export const RepoContainerStyled = styled.div`
    width: 100%;
    background-color: #272736;
    border-radius: 4px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;

    p {
        margin: 0;
    }

    &:hover {
        ${RemoveWrapperStyled} {
            display: block;
        }
    }
`;

export const RepoNameStyled = styled.p`
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
`;

export const RepoDetailsStyled = styled.p`
    font-size: 14px;
    color: #ffffff;
`;

export const UpdateStyled = styled.span`
    color: #bfbdd9;
    margin-left: 5px;
`;