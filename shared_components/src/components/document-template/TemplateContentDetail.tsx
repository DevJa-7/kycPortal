import React, {
    useState,
    useEffect
} from 'react';
import {
    makeStyles,
    Theme
} from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardMedia,
    CardActions,
} from '@material-ui/core';
import styled from 'styled-components';
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-json";
import "prismjs/components/prism-javascript";

import {
    ContentText,
    CustomButton,
    DragDropZone
} from '../common';
import { NOTIFICATION_STATES } from '../../common/constants';
import UtilService from '../../service/util.service';
import { TemplateDetailTable } from '../document-template';

/**
 * Constants
 */

/**
 * Types
 */

/**
 * Props
 */
interface IProps {
    className?: any,
    textRules: any,
    result: any,
    maxCount: number,
    handleTextRules: any,
    handleFiles: any,
    handleNotification: any,
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
    },

    item: {
        '&:nth-child(odd)': {
            paddingRight: 10,
        },

        '&:nth-child(even)': {
            paddingLeft: 10,
        },

        '@media screen and (max-width: 960px)': {
            width: '100%',
            padding: '0 !important',
        },

        width: '100%',
        marginTop: 45,
        minHeight: 200,

        '@media screen and (max-width: 1280px)': {
            marginTop: 25,
        },

        '@media screen and (max-width: 600px)': {
            marginTop: 15,
            marginBottom: 0,
            maxWidth: '100%',
        },
    },

    cardItem: {
        margin: 'auto',
        paddingTop: 20,
        borderRadius: '4px',
        height: 'fit-content',
        flexGrow: 0,
    },

    cardImage: {
        width: '100%',
        margin: 'auto',
        paddingTop: 20,
    },

    textButton: {
        boxShadow: 'unset',
        padding: '8px 16px',
    },

    ruleHeader: {
        color: '#727272',
        fontSize: 16,
        '@media screen and (max-width: 1280px)': {
            fontSize: 14,
        },

        '@media screen and (max-width: 600px)': {
            marginTop: 15,
            marginBottom: 0,
            maxWidth: '100%',
        },
    }

}));

/**
 * Styled Components
 */
const ContentDetailContainer = styled.div`
    display: flex;
`;

const ContentDetailsWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-flow: column;
`;

const ItemWrapper = styled.div`
    max-width: 550px;
`;

/**
 * Main Components
 */
const TemplateContentDetail = ({
    className,
    textRules,
    result,
    maxCount,
    handleTextRules,
    handleFiles,
    handleNotification,
}: IProps) => {

    /**
     * Use Styles
     */
    const classes = useStyles();

    const [files, setFiles] = useState<any>([]);
    const [showDropZone, setShowDropZone] = useState(true);

    const handleAddedFiles = (_files: Array<any>) => {
        setFiles(_files);
        checkDropZone(_files);
        handleFiles(_files);
    }

    const checkDropZone = (_files: Array<any> ) => {
        if (_files.length >= maxCount) {
            setShowDropZone(false);
        } else {
            setShowDropZone(true);
        }
    }

    const getFileInfo = (data: Array<File>) => {
        const file = data[0];
        const validFileType = ["image/png", "image/jpeg"];
        if (validFileType.indexOf(file.type) === -1) {
            handleNotification({
                message: 'Uploading file type should be either image/png or image/jpeg.',
                type: NOTIFICATION_STATES.warning,
            });
        } else if (file.size > 1000000) {
            handleNotification({
                message: 'Uploading file size should be less than 1MB.',
                type: NOTIFICATION_STATES.warning
            });
        } else {
            const reader = new FileReader();
            const imageObject: any = {};

            reader.onload = function (f: any) {
                imageObject.fileSrc = f.target.result;
                imageObject.file = file;
                imageObject.testResult = undefined;
                UtilService.getBase64(file, (res: any) => {
                    imageObject.image = res;
                    imageObject.imageType = file.type;
                });

                // added image objective to the files.
                const _files = [...files];
                _files.push(imageObject);
                handleAddedFiles(_files);
            };
            reader.readAsDataURL(file);
        }
    }

    const onFiles = (file: any) => {
        getFileInfo(file);
    };

    const handleRemoveImage = (index: number) => {
        const _files = [...files];
        _files.splice(index, 1);
        handleAddedFiles(_files);
    }

    const handleTextRule = (value: any) => {
        handleTextRules(value);
    }

    useEffect(() => {
        checkDropZone(files);
    }, [maxCount]);

    return (
        <ContentDetailContainer className={`${classes.root} ${className}`}>
            <ContentDetailsWrapper>
                <Grid container>
                    <Grid item className={classes.item} sm={12} md={6}>
                        <ItemWrapper>
                            <ContentText className={classes.ruleHeader}>
                                Textract Rules
                            </ContentText>
                            <Editor
                                value={textRules}
                                onValueChange={handleTextRule}
                                highlight={(code: any) => highlight(code, languages.json)}
                                padding={10}
                                name="textractRules"
                                style={{
                                    fontSize: 12,
                                    width: "100%",
                                    minHeight: "300px",
                                    border: "1px rgba(0, 0, 0, 0.34) solid",
                                    resize: "vertical",
                                }}
                            />
                        </ItemWrapper>
                    </Grid>
                    <Grid item className={classes.item} sm={12} md={6}>
                        <ItemWrapper>
                            { showDropZone && (
                                <DragDropZone
                                    className={classes.cardImage}
                                    onFiles={onFiles}
                                />
                            )}
                            { files.length > 0 && files.map((file: any, index: number) => (
                                <Card className={classes.cardItem}  key={index}>
                                    <CardMedia
                                        component="img"
                                        alt={file.fileSrc}
                                        image={file.fileSrc}
                                        title="Testing Document"
                                    />
                                    <CardActions>
                                        <CustomButton
                                            label="CLEAR IMAGE"
                                            variant="text"
                                            color="secondary"
                                            onClick={() => handleRemoveImage(index)}
                                            className={classes.textButton}
                                        />
                                    </CardActions>
                                </Card>
                            ))}
                            { result &&
                                <TemplateDetailTable data={result} />
                            }
                        </ItemWrapper>
                    </Grid>
                </Grid>
            </ContentDetailsWrapper>
        </ContentDetailContainer>
    )
}

TemplateContentDetail.defaultProps = {
    className: '',
    textRules: '',
    result: null,
    maxCount: 1,
    handleTextRules: null,
    handleFiles: null,
    handleNotification: null,
}

export default TemplateContentDetail;
