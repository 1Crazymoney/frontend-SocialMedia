import React from 'react';

// export const CInput = ({
//     type = 'text',
//     name = '',
//     placeholder = '',
//     emitFunction,
//     clickFunction,
//     value,
//     className,
// }) => {
//     if (type === 'button') {
//         return (
//             <button
//                 type="button"
//                 onClick={clickFunction}
//                 className={className}
//             >
//                 {value}
//             </button>
//         );
//     }
//     return (
//         <input
//             type={type}
//             name={name}
//             placeholder={placeholder}
//             onChange={emitFunction}
//             value={value}
//             className={className}
//         />
//     );
// };

export const CInput = ({
    type = 'text',
    name = '',
    placeholder = '',
    emitFunction,
    clickFunction,
    value,
    className,
}) => {
    if (type === 'button') {
        return (
            <button
                type="button"
                onClick={clickFunction}
                className={className}
            >
                {value}
            </button>
        );
    }
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={emitFunction}
            value={value}
            className={className}
        />
    );
};
