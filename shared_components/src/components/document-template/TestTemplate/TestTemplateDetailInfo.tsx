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
import {
    CustomButton,
    DragDropZone
} from '../../common';
import { NOTIFICATION_STATES } from '../../../common/constants';
import TestTemplateDetailTable from './TestTemplateDetailTable';
import TestTemplateMatchingTable from './TestTemplateMatchingTable';
import UtilService from '../../../service/util.service';

/**
 * Constants
 */

/**
 * Props
 */
interface IProps {
    className: any,
    maxCount: number,
    testTemplate: any,
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
        padding: '10px 0',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
    },

    item: {
        margin: '10px 10px 0px 0px',
        borderRadius: '4px',
        height: 'fit-content',
        flexGrow: 0,
    },

    cardImage: {
        width: '50%',
        maxWidth: '50%',
        margin: 'auto',
        '@media screen and (max-width: 1280px)': {
            width: '50%',
            maxWidth: '50%',
        },
        '@media screen and (max-width: 900px)': {
            width: '80%',
            maxWidth: '80%',
        },
    },

    textButton: {
        boxShadow: 'unset',
        padding: '8px 16px',
    }
}));

/**
 * Styled Components
 */
const Divider = styled.div`
    border-bottom: solid 1px #b6b6b6;
    width: 100%;
    padding: 20px 0px;
`;

/**
 * Main Components
 */
const TestTemplateDetailInfo = ({
    className,
    maxCount,
    testTemplate,
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
                UtilService.getBase64(file, (result: any) => {
                    imageObject.image = result;
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

    useEffect(() => {
        checkDropZone(files);
    }, [maxCount]);

    return (
        <Grid container className={`${classes.root} ${className}`}>
            <Grid item sm={12} md={testTemplate?.document ? 6 : 12} key="card-image">
                { showDropZone && (
                    <DragDropZone
                        className={classes.cardImage}
                        onFiles={onFiles}
                    />
                )}
                { files.length > 0 && (
                    <Grid container justify="space-between" spacing={2}>
                        { files.map((file: any, index: number) => (
                            <Grid item md={testTemplate?.document ? 12 : 6} sm={12} key={index}>
                                <Card className={classes.item}>
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
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
            { testTemplate?.document && (
                <>
                    <Grid item sm={12} md={6} key="card-info">
                        <TestTemplateDetailTable data={testTemplate} />
                    </Grid>

                    <Grid item md={12} sm={12}>
                        <Divider />
                    </Grid>
                    <Grid item md={12} sm={12}>
                        <TestTemplateMatchingTable data={testTemplate} />
                    </Grid>
                </>
            )}
        </Grid>
    )
}

TestTemplateDetailInfo.defaultProps = {
    className: '',
    maxCount: 1,
    testTemplate: null,
    handleFiles: null,
    handleNotification: null,
}

export default TestTemplateDetailInfo;
