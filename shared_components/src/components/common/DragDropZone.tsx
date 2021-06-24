import React from 'react';
import styled from 'styled-components';
import {useDropzone} from 'react-dropzone';
import {
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import { CustomButton } from '.';
import { UploadIcon } from '../../common/icons';

/**
 * Constants
 */

/**
 * Props
 */
interface IProps {
    className?: any,
    multiples?: boolean,
    onFiles?: any,
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    root: {

    },

    icon: {
        width: 60,
        height: 40,

        '@media screen and (max-width: 1280px)': {
            width: 56,
            height: 36,
        },

        '@media screen and (max-width: 600px)': {
            width: 40,
            height: 30,
        },
    },

    par: {
        fontSize: 20,
        color: '#212121',
        marginBottom: 0,

        '@media screen and (max-width: 1280px)': {
            fontSize: 18,
        },

        '@media screen and (max-width: 600px)': {
            top: 16,
        },
    },

    or: {
        fontSize: 17,
        color: '#727272',

        '@media screen and (max-width: 1280px)': {
            fontSize: 15,
        },

        '@media screen and (max-width: 600px)': {
            top: 13,
        },
    }
}));

/**
 * Functions
 */
const getColor = (props: any) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const getBgColor = (props: any) => {
    if (props.isDragAccept) {
        return '#eeeeee';
    }
    if (props.isDragReject) {
        return '#f75776';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#ffffff';
}

/**
 * Styled Components
 */
const ContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const DropZone = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${(props: any) => getColor(props)};
    border-style: dashed;
    background-color: ${(props: any) => getBgColor(props)};
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
`;

const InputArea = styled.input`
`;

const ParagraphArea = styled.p`
`;

/**
 * Main Components
 */
const DragDropZone = ({
    className,
    multiples,
    onFiles,
}: IProps) => {
    /**
     * Use Styles
     */
    const classes = useStyles();

    const {
        getRootProps,
        getInputProps,
        open,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true,
        multiple: multiples,
        accept: 'image/*',
        onDrop: (acceptedFiles: any[]) => {
            const _files = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }));
            onFiles(_files);
        }
    });

    return (
        <ContainerWrapper className={className}>
            <DropZone
                {...getRootProps({
                    isDragActive,
                    isDragAccept,
                    isDragReject})
                }
            >
                <InputArea {...getInputProps()}/>
                <UploadIcon className={classes.icon} />
                {
                    isDragReject ? (
                        <ParagraphArea className={classes.par}>
                            Can not drag & drop several files.
                        </ParagraphArea>
                    ) : (
                        <ParagraphArea className={classes.par}>
                            Drag & drop file here
                        </ParagraphArea>
                    )
                }
                <ParagraphArea className={classes.or}>
                    or
                </ParagraphArea>
                <CustomButton
                    label="UPLOAD FILE"
                    onClick={open}
                />

            </DropZone>
        </ContainerWrapper>
    );
}

DragDropZone.defaultProps = {
    className: '',
    multiples: false,
    onFiles: null,
}

export default DragDropZone;
