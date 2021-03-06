/**
 * External dependencies
 */
import classnames from 'classnames/dedupe';

/**
 * Internal dependencies
 */
import fixXmlImportedContent from '../../utils/fix-xml-imported-content';
import IconPicker from '../../components/icon-picker';

import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;

const {
    applyFilters,
} = wp.hooks;

const {
    InnerBlocks,
    RichText,
} = wp.blockEditor;

const { name } = metadata;

export default [
    // v2.8.2
    {
        ghostkit: {
            supports: {
                styles: true,
                spacings: true,
                display: true,
                scrollReveal: true,
                customCSS: true,
            },
        },
        supports: metadata.supports,
        attributes: {
            ...metadata.attributes,
            icon: {
                type: 'string',
                default: 'fas fa-quote-left',
            },
            starsIcon: {
                type: 'string',
                default: 'fas fa-star',
            },
        },
        save: class BlockSave extends Component {
            constructor( props ) {
                super( props );

                // fix xml imported string.
                this.props.attributes.posterTag = fixXmlImportedContent( this.props.attributes.posterTag );
            }

            render() {
                const {
                    attributes,
                } = this.props;

                const {
                    photoTag,
                    icon,
                    source,
                    stars,
                    starsIcon,
                    url,
                    target,
                    rel,
                } = attributes;

                let className = classnames(
                    'ghostkit-testimonial',
                    url ? 'ghostkit-testimonial-with-link' : ''
                );

                className = applyFilters( 'ghostkit.blocks.className', className, {
                    ...{
                        name,
                    },
                    ...this.props,
                } );

                return (
                    <div className={ className }>
                        { url ? (
                            <a className="ghostkit-testimonial-link" href={ url } target={ target || false } rel={ rel || false }>
                                <span />
                            </a>
                        ) : '' }
                        { icon ? (
                            <IconPicker.Render
                                name={ icon }
                                tag="div"
                                className="ghostkit-testimonial-icon"
                            />
                        ) : '' }
                        <div className="ghostkit-testimonial-content">
                            <InnerBlocks.Content />
                        </div>
                        { photoTag ? (
                            <div
                                className="ghostkit-testimonial-photo"
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={ {
                                    __html: photoTag,
                                } }
                            />
                        ) : '' }
                        { ! RichText.isEmpty( attributes.name ) || ! RichText.isEmpty( source ) ? (
                            <div className="ghostkit-testimonial-meta">
                                { ! RichText.isEmpty( attributes.name ) ? (
                                    <div className="ghostkit-testimonial-name">
                                        <RichText.Content value={ attributes.name } />
                                    </div>
                                ) : '' }
                                { ! RichText.isEmpty( source ) ? (
                                    <div className="ghostkit-testimonial-source">
                                        <RichText.Content value={ source } />
                                    </div>
                                ) : '' }
                            </div>
                        ) : '' }
                        { 'number' === typeof stars && starsIcon ? (
                            <div className="ghostkit-testimonial-stars">
                                <div className="ghostkit-testimonial-stars-wrap">
                                    <div className="ghostkit-testimonial-stars-front" style={ { width: `${ ( 100 * stars ) / 5 }%` } }>
                                        <span className={ starsIcon } />
                                        <span className={ starsIcon } />
                                        <span className={ starsIcon } />
                                        <span className={ starsIcon } />
                                        <span className={ starsIcon } />
                                    </div>
                                    <div className="ghostkit-testimonial-stars-back">
                                        <span className={ starsIcon } />
                                        <span className={ starsIcon } />
                                        <span className={ starsIcon } />
                                        <span className={ starsIcon } />
                                        <span className={ starsIcon } />
                                    </div>
                                </div>
                            </div>
                        ) : '' }
                    </div>
                );
            }
        },
    },

    // v2.2.0
    {
        ghostkit: {
            supports: {
                styles: true,
                spacings: true,
                display: true,
                scrollReveal: true,
            },
        },
        supports: {
            html: false,
            className: false,
            anchor: true,
            align: [ 'wide', 'full' ],
        },
        attributes: {
            icon: {
                type: 'string',
                default: 'fas fa-quote-left',
            },
            photo: {
                type: 'number',
                default: '',
            },
            photoTag: {
                type: 'string',
                default: '',
            },
            photoSizes: {
                type: 'object',
                default: '',
            },
            photoSize: {
                type: 'string',
                default: 'thumbnail',
            },
            name: {
                type: 'array',
                source: 'children',
                selector: '.ghostkit-testimonial-name',
                default: [
                    {
                        props: {
                            children: [ 'Katrina Craft' ],
                        },
                        type: 'strong',
                    },
                ],
            },
            source: {
                type: 'array',
                source: 'children',
                selector: '.ghostkit-testimonial-source',
                default: 'Designer',
            },
        },
        save: class TestimonialBlockSave extends Component {
            constructor( props ) {
                super( props );

                // fix xml imported string.
                this.props.attributes.posterTag = fixXmlImportedContent( this.props.attributes.posterTag );
            }

            render() {
                const {
                    attributes,
                } = this.props;

                const {
                    photoTag,
                    icon,
                    source,
                } = attributes;

                let className = 'ghostkit-testimonial';

                className = applyFilters( 'ghostkit.blocks.className', className, {
                    ...{
                        name: 'ghostkit/testimonial',
                    },
                    ...this.props,
                } );

                return (
                    <div className={ className }>
                        { icon ? (
                            <IconPicker.Render
                                name={ icon }
                                tag="div"
                                className="ghostkit-testimonial-icon"
                            />
                        ) : '' }
                        <div className="ghostkit-testimonial-content">
                            <InnerBlocks.Content />
                        </div>
                        { photoTag ? (
                            <div
                                className="ghostkit-testimonial-photo"
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={ {
                                    __html: photoTag,
                                } }
                            />
                        ) : '' }
                        { ( attributes.name && 0 < attributes.name.length ) || ( source && 0 < source.length ) ? (
                            <div className="ghostkit-testimonial-meta">
                                { ! RichText.isEmpty( attributes.name ) ? (
                                    <RichText.Content
                                        tagName="div"
                                        className="ghostkit-testimonial-name"
                                        value={ attributes.name }
                                    />
                                ) : '' }
                                { ! RichText.isEmpty( source ) ? (
                                    <RichText.Content
                                        tagName="small"
                                        className="ghostkit-testimonial-source"
                                        value={ source }
                                    />
                                ) : '' }
                            </div>
                        ) : '' }
                    </div>
                );
            }
        },
    },
];
