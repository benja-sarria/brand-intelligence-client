import {
    ChangeEvent,
    DOMElement,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { Button, Table } from "react-bootstrap";
import { NiceClassContext } from "../../context/NiceClassProvider";
import { compare } from "../../helpers/compareFunction";
import { FormPagination } from "../FormPagination/FormPagination";
import debounce from "lodash.debounce";
import style from "./NiceProductList.module.scss";
import { ControlledCheckbox } from "../ControlledCheckbox/ControlledCheckbox";
import { compareClass } from "../../helpers/compareClassFunction";
import { TableMenu } from "../TableMenu/TableMenu";
import { compareSelect } from "../../helpers/compareSelectFunction";
import Link from "next/link";

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
    const [isSortedBySelect, setIsSortedBySelect] = useState(false);
    const [isSortedByRelevance, setIsSortedByRelevance] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [renderedList, setRenderedList] =
        useState<{ currentPage: any[]; length: number }>();

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

    const debounceBlurInput = useCallback(
        debounce((target) => target.blur(), 1000),
        []
    );

    const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        console.dir(evt.target.value);
        debounceDropDown(evt.target.value.replace(/[ \t]+$/, ""));
        debounceSorting();
        debouncePageOne();
        debounceBlurInput(evt.target);
    };

    const checkboxHandler = (
        selectedClass: number,
        appends: boolean,
        description: string,
        [row]: HTMLElement[],
        cells: HTMLElement[]
    ) => {
        if (!selectedNiceProtection[selectedClass] && appends) {
            setSelectedNiceProtection({
                ...selectedNiceProtection,
                [selectedClass]: [description],
            });
            row.classList.add(`${style["custom-selected-row"]}`);
            cells.forEach((cell: any) => {
                cell.classList.add(`${style["custom-selected-cell"]}`);
                if (cell.dataset.type) {
                    cell.children[0].src =
                        cell.dataset.type === "product"
                            ? "/assets/img/productSecondary.webp"
                            : "/assets/img/servicesSecondary.webp";
                }
            });
        } else if (selectedNiceProtection[selectedClass] && appends) {
            setSelectedNiceProtection({
                ...selectedNiceProtection,
                [selectedClass]: [
                    ...selectedNiceProtection[selectedClass],
                    description,
                ],
            });
            row.classList.add(`${style["custom-selected-row"]}`);
            cells.forEach((cell: any) => {
                cell.classList.add(`${style["custom-selected-cell"]}`);
                if (cell.dataset.type) {
                    cell.children[0].src =
                        cell.dataset.type === "product"
                            ? "/assets/img/productSecondary.webp"
                            : "/assets/img/servicesSecondary.webp";
                }
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
            row.classList.remove(`${style["custom-selected-row"]}`);
            cells.forEach((cell: any) => {
                cell.classList.remove(`${style["custom-selected-cell"]}`);
                if (cell.dataset.type) {
                    cell.children[0].src =
                        cell.dataset.type === "product"
                            ? "/assets/img/productMain.webp"
                            : "/assets/img/servicesMain.webp";
                }
            });
        }
    };

    const correctStyles = () => {
        const rows = Array.from(document.querySelectorAll(".custom-row"));
        const cells = Array.from(document.querySelectorAll(".custom-cell"));
        rows.forEach((row: any) => {
            if (selectedNiceProtection[row.dataset.class]) {
                if (
                    !selectedNiceProtection[row.dataset.class].includes(
                        row.dataset.name
                    )
                ) {
                    row.classList.remove(`${style["custom-selected-row"]}`);
                    Array.from(row.children).forEach((children: any) => {
                        children.classList.remove(
                            `${style["custom-selected-cell"]}`
                        );
                        if (children.dataset.type) {
                            children.children[0].src =
                                children.dataset.type === "product"
                                    ? "/assets/img/productMain.webp"
                                    : "/assets/img/servicesMain.webp";
                        }
                    });
                } else if (
                    selectedNiceProtection[row.dataset.class].includes(
                        row.dataset.name
                    )
                ) {
                    row.classList.add(`${style["custom-selected-row"]}`);
                    Array.from(row.children).forEach((children: any) => {
                        children.classList.add(
                            `${style["custom-selected-cell"]}`
                        );
                        if (children.dataset.type) {
                            children.children[0].src =
                                children.dataset.type === "product"
                                    ? "/assets/img/productSecondary.webp"
                                    : "/assets/img/servicesSecondary.webp";
                        }
                    });
                }
            } else if (!selectedNiceProtection[row.dataset.class]) {
                row.classList.remove(`${style["custom-selected-row"]}`);
                Array.from(row.children).forEach((children: any) => {
                    children.classList.remove(
                        `${style["custom-selected-cell"]}`
                    );
                    if (children.dataset.type) {
                        children.children[0].src =
                            children.dataset.type === "product"
                                ? "/assets/img/productMain.webp"
                                : "/assets/img/servicesMain.webp";
                    }
                });
            }
        });
    };

    const sortByImportance = (array: []) => {
        console.log("Ejecutando sorted by relevance");
        console.log(array);

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
    const sortBySelect = (array: []) => {
        array.forEach(
            (
                term: { text: string; niceClass: number; importance: number },
                index: number
            ) => {
                console.log(
                    Boolean(
                        selectedNiceProtection[term.niceClass] &&
                            selectedNiceProtection[term.niceClass].includes(
                                term.text
                            )
                    )
                );

                if (
                    selectedNiceProtection[term.niceClass] &&
                    selectedNiceProtection[term.niceClass].includes(term.text)
                ) {
                    term.importance = 0;
                } else if (term.text.includes(category)) {
                    if (term.text.length === category.length) {
                        term.importance = 3;
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
        const filteredArray = array.filter(
            (element: {
                text: string;
                niceClass: number;
                importance: number;
            }) => {
                return element.importance === 0;
            }
        );

        console.log(filteredArray);

        const sorted = array.sort(compareSelect);

        const finalArray = [...filteredArray, ...sorted];
        console.log(finalArray);
        setSearchedArray([...filteredArray]);
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

    const arrangeNonSearched = (array: []) => {
        const nonSelectedTerms = array.filter(
            (term: { text: string; niceClass: number }, index: number) => {
                if (selectedNiceProtection[term.niceClass]) {
                    return !selectedNiceProtection[term.niceClass].includes(
                        term.text
                    );
                } else {
                    return term;
                }
            }
        );

        console.log(nonSelectedTerms);

        const selectedTerms = array.filter(
            (term: { text: string; niceClass: number }, index: number) => {
                if (selectedNiceProtection[term.niceClass]) {
                    return selectedNiceProtection[term.niceClass].includes(
                        term.text
                    );
                }
            }
        );
        console.log("este es el final array no filtrado");
        console.log(selectedTerms);

        const nonSearcheddArray = [...selectedTerms, ...nonSelectedTerms];
        console.log(nonSearcheddArray);
        setIsSortedByRelevance(false);
        return nonSearcheddArray;
    };

    const returnFilteredItems = (
        page: number,
        sortedBySelect: boolean = isSortedBySelect
    ) => {
        console.log(`Sory by select está en: ${sortedBySelect}`);

        const filteredArray = searchedTerm
            ? niceClass.wholeClassification.filter(
                  (
                      term: { text: string; niceClass: number },
                      index: number
                  ) => {
                      return (
                          term.text
                              .toLowerCase()
                              .includes(searchedTerm.toLowerCase()) ||
                          (selectedNiceProtection[term.niceClass] &&
                              selectedNiceProtection[term.niceClass].includes(
                                  term.text
                              ) &&
                              !isSortedByRelevance &&
                              !isSortedByClass)
                      );
                  }
              )
            : [...niceClass.wholeClassification];

        const sortedArray = searchedTerm
            ? sortedBySelect && !isSortedByRelevance && !isSortedByClass
                ? sortBySelect(filteredArray)
                : !isSortedByClass && !sortedBySelect && isSortedByRelevance
                ? sortByImportance(filteredArray)
                : sortByClass(filteredArray)
            : arrangeNonSearched(filteredArray);

        console.log(Boolean(searchedTerm));
        console.log(Boolean(!isSortedByClass));
        console.log(Boolean(sortedBySelect));

        console.log(sortedArray);

        const currentPage = sortedArray
            .slice(page, 21 + page)
            .map((term: { text: string; niceClass: number }, index: number) => {
                return (
                    <tr
                        key={index}
                        className={`custom-row ${style["custom-table-row"]}`}
                        data-name={`${term.text}`}
                        data-class={`${term.niceClass}`}
                    >
                        <td
                            className={`custom-cell ${style["custom-table-cell"]}`}
                            data-name={`${term.text}`}
                            data-class={`${term.niceClass}`}
                        >
                            {term.niceClass}
                        </td>
                        <td
                            className={`custom-cell ${style["custom-table-cell"]}`}
                            data-name={`${term.text}`}
                            data-class={`${term.niceClass}`}
                        >
                            {term.text}
                        </td>
                        <td
                            className={`custom-cell ${style["custom-table-cell"]}`}
                            data-name={`${term.text}`}
                            data-class={`${term.niceClass}`}
                            data-type={
                                term.niceClass < 35 ? "product" : "service"
                            }
                        >
                            {term.niceClass < 35 ? (
                                <img
                                    src="/assets/img/productMain.webp"
                                    className={`${style["custom-cell-img"]}`}
                                />
                            ) : (
                                <img
                                    src="/assets/img/servicesMain.webp"
                                    className={`${style["custom-cell-img"]}`}
                                />
                            )}
                        </td>
                        <td
                            className={`custom-cell ${style["custom-table-cell"]}`}
                            data-name={`${term.text}`}
                            data-class={`${term.niceClass}`}
                        >
                            {" "}
                            <ControlledCheckbox
                                checkboxHandler={checkboxHandler}
                                name={term.niceClass}
                                description={term.text}
                                selectedNiceProtection={selectedNiceProtection}
                            />
                        </td>
                    </tr>
                );
            });
        setRenderedList({ currentPage, length: filteredArray.length });
        // return { currentPage, length: filteredArray.length };
    };

    const input = useRef(category);
    useEffect(() => {
        console.log(input);
        input.current.value = category;
        returnFilteredItems(currentPage);
    }, []);
    useEffect(() => {}, []);

    useEffect(() => {
        returnFilteredItems(currentPage);
        if (!isSortedBySelect) {
            setIsSortedByRelevance(true);
        }
    }, [
        selectedNiceProtection,
        isSortedByClass,
        isSortedBySelect,
        currentPage,
        searchedTerm,
        isSortedByRelevance,
    ]);

    useEffect(() => {
        console.log(selectedNiceProtection);
        console.log(searchedTerm);
        correctStyles();
    }, [
        searchedTerm,
        niceClass,
        isSortedByClass,
        searchedArray,
        renderedList,
        currentPage,
    ]);

    return (
        <>
            <label
                htmlFor="search-input"
                className={`form-label ${style["custom-table-subtitle"]}`}
            >
                Selecciona de la siguiente lista, todos los productos/servicios
                que se relacionen con lo que ofreces:
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
                                    type={"niceClass"}
                                    setIsSortedBySelect={setIsSortedBySelect}
                                    setIsSortedByRelevance={
                                        setIsSortedByRelevance
                                    }
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
                            Tipo
                        </th>
                        <th
                            className={`${style["custom-table-cell"]} ${style["heading"]}  ${style["select-heading"]}`}
                        >
                            <div className={`${style["custom-table-menu"]}`}>
                                <TableMenu
                                    returnFilteredItems={returnFilteredItems}
                                    setIsSortedByClass={setIsSortedByClass}
                                    currentPage={currentPage}
                                    isSortedByClass={isSortedByClass}
                                    type={"select"}
                                    setIsSortedBySelect={setIsSortedBySelect}
                                    setIsSortedByRelevance={
                                        setIsSortedByRelevance
                                    }
                                />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        /* returnFilteredItems(currentPage).currentPage */ renderedList?.currentPage
                    }
                </tbody>
            </Table>
            <FormPagination
                pages={
                    searchedTerm
                        ? /* returnFilteredItems(currentPage) */ renderedList &&
                          renderedList.length / 20
                        : niceClass.wholeClassification &&
                          niceClass.wholeClassification.length / 20
                }
                setPage={setCurrentPage}
            />
            {Object.keys(selectedNiceProtection).length > 0 && (
                <div className={`${style["custom-btn-container"]}`}>
                    <Link href="/trademarkForm">
                        <a className={`btn ${style["form-custom-btn"]}`}>
                            Confirmar protección
                        </a>
                    </Link>
                </div>
            )}
        </>
    );
};
