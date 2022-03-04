import {
    ChangeEvent,
    DOMElement,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Table } from "react-bootstrap";
import { NiceClassContext } from "../../context/NiceClassProvider";
import { compare } from "../../helpers/compareFunction";
import { FormPagination } from "../FormPagination/FormPagination";
import debounce from "lodash.debounce";
import style from "./NiceProductList.module.scss";
import { ControlledCheckbox } from "../ControlledCheckbox/ControlledCheckbox";
import { compareClass } from "../../helpers/compareClassFunction";
import { TableMenu } from "../TableMenu/TableMenu";

export const NiceProductList = () => {
    const {
        niceClass,
        category,
        setSelectedNiceProtection,
        selectedNiceProtection,
    } = useContext(NiceClassContext);
    const [searchedTerm, setSearchedTerm] = useState(category);
    const [searchedArray, setSearchedArray] = useState([]);
    const [isSortedByClass, setIsSortedByClass] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const niceKeys: string[] = Object.keys(niceClass.wholeClassification);

    const debounceDropDown = useCallback(
        debounce((inputValue) => setSearchedTerm(inputValue), 1000),
        []
    );
    const debounceSorting = useCallback(
        debounce(() => setIsSortedByClass(false), 1000),
        []
    );
    const debouncePageOne = useCallback(
        debounce(() => {
            const pageOne: any =
                document.querySelector(".MuiPagination-ul")!.children[1]
                    .children[0];
            pageOne.click();
        }, 1000),
        []
    );

    const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        console.dir(evt.target.value);
        debounceDropDown(evt.target.value.replace(/[ \t]+$/, ""));
        debounceSorting();
        debouncePageOne();
    };

    const checkboxHandler = (
        selectedClass: number,
        appends: boolean,
        description: string
    ) => {
        if (!selectedNiceProtection[selectedClass] && appends) {
            setSelectedNiceProtection({
                ...selectedNiceProtection,
                [selectedClass]: [description],
            });
        } else if (selectedNiceProtection[selectedClass] && appends) {
            setSelectedNiceProtection({
                ...selectedNiceProtection,
                [selectedClass]: [
                    ...selectedNiceProtection[selectedClass],
                    description,
                ],
            });
        } else if (!appends) {
            setSelectedNiceProtection({
                ...selectedNiceProtection,
                [selectedClass]: selectedNiceProtection[selectedClass].filter(
                    (element: string) => {
                        return element !== description;
                    }
                ),
            });
            console.log(selectedNiceProtection[selectedClass]);

            if (selectedNiceProtection[selectedClass].length - 1 === 0) {
                const contextCopy = { ...selectedNiceProtection };

                delete contextCopy[selectedClass];
                setSelectedNiceProtection({ ...contextCopy });
            }
        }
    };

    const sortByImportance = (array: []) => {
        array.forEach(
            (
                term: { text: string; niceClass: number; importance: number },
                index: number
            ) => {
                if (term.text.includes(category)) {
                    if (term.text.length === category.length) {
                        term.importance = 0;
                    } else {
                        term.importance = Math.abs(
                            term.text.length - category.length
                        );
                    }
                } else {
                    term.importance = term.text.length;
                }
            }
        );

        const sorted = array.sort(compare);
        return sorted;
    };

    const sortByClass = (array: []) => {
        const sortedImportanceCriteria: {
            [niceClass: number]: number;
        } = {};

        array.forEach((term: { text: string; niceClass: number }) => {
            if (sortedImportanceCriteria[term.niceClass]) {
                sortedImportanceCriteria[term.niceClass] += 1;
            } else {
                sortedImportanceCriteria[term.niceClass] = 1;
            }
        });
        console.log(sortedImportanceCriteria);

        const weightedArray = array.map(
            (term: { text: string; niceClass: number }) => {
                if (term.niceClass === 35) {
                    const values = Object.values(sortedImportanceCriteria);
                    const maxValue = Math.max(...values) + 1;
                    return {
                        ...term,
                        importance: maxValue,
                    };
                } else {
                    return {
                        ...term,
                        importance: sortedImportanceCriteria[term.niceClass],
                    };
                }
            }
        );
        const sorted = weightedArray.sort(compareClass);
        return sorted;
    };

    const returnFilteredItems = (page: number) => {
        const filteredArray = searchedTerm
            ? niceClass.wholeClassification.filter(
                  (
                      term: { text: string; niceClass: number },
                      index: number
                  ) => {
                      return term.text
                          .toLowerCase()
                          .includes(searchedTerm.toLowerCase());
                  }
              )
            : niceClass.wholeClassification;

        const sortedArray = searchedTerm
            ? !isSortedByClass
                ? sortByImportance(filteredArray)
                : sortByClass(filteredArray)
            : filteredArray;

        const currentPage = sortedArray
            .slice(page, 21 + page)
            .map((term: { text: string; niceClass: number }, index: number) => {
                return (
                    <tr key={index} className={`${style["custom-table-row"]}`}>
                        <td className={`${style["custom-table-cell"]}`}>
                            {term.niceClass}
                        </td>
                        <td className={`${style["custom-table-cell"]}`}>
                            {term.text}
                        </td>
                        <td className={`${style["custom-table-cell"]}`}>
                            {" "}
                            <ControlledCheckbox
                                checkboxHandler={checkboxHandler}
                                name={term.niceClass}
                                description={term.text}
                            />
                        </td>
                    </tr>
                );
            });
        return { currentPage, length: filteredArray.length };
    };

    const returnAllTerms = (page: number) => {
        const currentPage = niceClass.wholeClassification
            .slice(page, 21 + page)
            .map((term: { text: string; niceClass: number }, index: number) => {
                return (
                    <tr key={index} className={`${style["custom-table-row"]}`}>
                        <td className={`${style["custom-table-cell"]}`}>
                            {term.niceClass}
                        </td>
                        <td className={`${style["custom-table-cell"]}`}>
                            {term.text}
                        </td>
                        <td className={`${style["custom-table-cell"]}`}>
                            <ControlledCheckbox
                                checkboxHandler={checkboxHandler}
                                name={term.niceClass}
                                description={term.text}
                            />
                        </td>
                    </tr>
                );
            });
        return currentPage;
    };

    const input = useRef(category);
    useEffect(() => {
        console.log(input);
        input.current.value = category;
    }, []);

    useEffect(() => {
        console.log(selectedNiceProtection);
        console.log(searchedTerm);
    }, [
        searchedTerm,
        niceClass,
        currentPage,
        selectedNiceProtection,
        isSortedByClass,
    ]);

    return (
        <>
            <label htmlFor="search-input" className={`form-label`}>
                Busca tu producto
            </label>
            <input
                type="text"
                className={`form-control ${style["form-control-custom"]}`}
                id="search-input"
                onChange={(evt) => {
                    inputHandler(evt);
                    setCurrentPage(0);
                }}
                ref={input}
            />
            <Table striped hover className={`${style["custom-table"]}`}>
                <thead>
                    <tr>
                        <th
                            className={`${style["custom-table-cell"]} ${style["heading"]} ${style["class-heading"]}`}
                        >
                            <p className={`${style["custom-table-heading"]}`}>
                                Clase Niza
                            </p>
                            <div className={`${style["custom-table-menu"]}`}>
                                <TableMenu
                                    returnFilteredItems={returnFilteredItems}
                                    setIsSortedByClass={setIsSortedByClass}
                                    currentPage={currentPage}
                                    isSortedByClass={isSortedByClass}
                                />
                            </div>
                        </th>
                        <th
                            className={`${style["custom-table-cell"]} ${style["heading"]}`}
                        >
                            Nombre del Producto
                        </th>
                        <th
                            className={`${style["custom-table-cell"]} ${style["heading"]}`}
                        >
                            #
                        </th>
                    </tr>
                </thead>
                <tbody>{returnFilteredItems(currentPage).currentPage}</tbody>
            </Table>
            <FormPagination
                pages={
                    searchedTerm
                        ? returnFilteredItems(currentPage).length / 20
                        : niceClass.wholeClassification.length / 20
                }
                setPage={setCurrentPage}
            />
        </>
    );
};
