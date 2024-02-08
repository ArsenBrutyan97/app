import React, { ChangeEvent, useCallback, useState } from 'react';
import Search from 'assets/search.svg';
import {
    AutocompleteContainer,
    Input,
    InputWrapper,
    SuggestionItem,
    SuggestionsList,
} from './styled';
import { IRepositories } from '@/store/types';

interface IAutocomplete {
    suggestions: IRepositories[];
    onSelect: (selected: IRepositories) => void;
}

const Autocomplete: React.FC<IAutocomplete> = ({ suggestions, onSelect }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<
        IRepositories[]
    >([]);

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setInputValue(value);

            // Filter suggestions based on input value
            const filtered = suggestions.filter(
                (suggestion) =>
                    suggestion.name.toLowerCase().indexOf(value.toLowerCase()) >
                    -1,
            );
            setFilteredSuggestions(filtered);

            if (!value.length) {
                setFilteredSuggestions([]);
            }
        },
        [suggestions],
    );

    const handleSuggestionClick = (suggestion: IRepositories) => {
        setInputValue(suggestion.name);
        setFilteredSuggestions([]);
        onSelect(suggestion);
    };

    return (
        <AutocompleteContainer>
            <InputWrapper>
                <Search />
                <Input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Search a Github Repository..."
                />
            </InputWrapper>
            {filteredSuggestions.length > 0 && (
                <SuggestionsList>
                    {filteredSuggestions.map((suggestion) => (
                        <SuggestionItem
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion.name}
                        </SuggestionItem>
                    ))}
                </SuggestionsList>
            )}
        </AutocompleteContainer>
    );
};

export default Autocomplete;
