import Event from '@ckeditor/ckeditor5-utils/src/eventinfo';
import { useEffect, useRef, useState } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  ClassicEditor,
  Code,
  CodeBlock,
  Essentials,
  FileLoader,
  FindAndReplace,
  FullPage,
  GeneralHtmlSupport,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Markdown,
  MediaEmbed,
  PageBreak,
  // Paragraph,
  PasteFromMarkdownExperimental,
  SelectAll,
  ShowBlocks,
  SimpleUploadAdapter,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Underline,
  Undo,
  Heading,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import './styles.css';

export type CustomEditorProps = {
  onChange: (data: string) => void;
  value: string;
};
const CustomEditor = ({ onChange, value }: CustomEditorProps) => {
  const editorRef = useRef(null);
  const [editorData, setEditorData] = useState('');

  useEffect(() => {
    setEditorData(value);
  }, [value]);

  class MyUploadAdapter {
    loader: FileLoader;
    constructor(loader: FileLoader) {
      this.loader = loader;
    }

    // Starts the upload process
    upload() {
      return this.loader.file.then((file: File | null) => {
        if (!file) {
          return Promise.reject(new Error('No file to upload.'));
        }

        return new Promise<{ default: string }>((resolve, reject) => {
          // Create a FormData object to send the file
          const formData = new FormData();
          formData.append('file', file);

          // Add query parameters for file type and visibility
          const queryParams = new URLSearchParams({
            type: 'product',
            isPublic: 'true',
          });

          console.log(
            'Uploading file to editor:',
            file.name,
            file.type,
            file.size,
          );

          // Import axios dynamically to use the configured instance with interceptors
          import('@/lib/axios')
            .then(({ axios }) => {
              // Upload the file directly to the backend using axios
              return axios.post(
                `/files/upload?${queryParams.toString()}`,
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
              );
            })
            .then((response) => {
              // Axios automatically throws for non-2xx responses
              // and automatically parses JSON
              return response.data;
            })
            .then((data) => {
              console.log('File upload response:', data);

              // The response contains a path field which is the key for the file
              // Check for different response structures
              let path = '';

              if (data && data.path) {
                // Direct response structure
                path = data.path;
              } else if (data && data.data && data.data.path) {
                // Nested response structure
                path = data.data.path;
              }

              if (path) {
                // Construct the URL using the path/key from the response
                const fileUrl = `${'/api/proxy'}/files/${path}`;
                console.log('Generated file URL:', fileUrl);

                resolve({
                  default: fileUrl,
                });
              } else {
                console.error('Invalid server response:', data);
                reject(
                  new Error(
                    'Invalid response from server - missing path field',
                  ),
                );
              }
            })
            .catch((error) => {
              console.error('File upload error:', error);
              reject(error);
            });
        });
      });
    }
  }

  // Function to extract file key from URL
  const extractFileKeyFromUrl = (url: string): string | null => {
    // URL format: /api/proxy/files/{key}
    const match = url.match(/\/files\/(.+)$/);
    return match ? match[1] : null;
  };

  // Function to delete a file from the server
  const deleteFileFromServer = async (url: string): Promise<boolean> => {
    try {
      const fileKey = extractFileKeyFromUrl(url);
      if (!fileKey) {
        console.error('Could not extract file key from URL:', url);
        return false;
      }

      console.log('Deleting file with key:', fileKey);

      // Sử dụng axios thay vì fetch để tận dụng interceptor đã có (thêm token tự động)
      const { axios } = await import('@/lib/axios');

      const response = await axios.delete(`/files/${fileKey}`);

      console.log('File deleted successfully:', fileKey);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  };

  // Define the upload adapter plugin
  function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: FileLoader,
    ) => {
      return new MyUploadAdapter(loader);
    };
  }

  // Define the image delete plugin
  function ImageDeletePlugin(editor: any) {
    // Store the current image URLs in the editor
    let currentImageUrls = new Set<string>();

    // Function to get all image URLs in the editor content
    const getImageUrlsFromContent = () => {
      const newUrls = new Set<string>();
      const content = editor.getData();

      // Use regex to find all image URLs in the content
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      let match;

      while ((match = imgRegex.exec(content)) !== null) {
        const url = match[1];
        if (url.includes('/files/')) {
          newUrls.add(url);
        }
      }

      return newUrls;
    };

    // Initialize the current image URLs when the editor is ready
    editor.on('ready', () => {
      currentImageUrls = getImageUrlsFromContent();
      console.log('Initial image URLs:', Array.from(currentImageUrls));
    });

    // Monitor changes to detect deleted images
    editor.model.document.on('change:data', async () => {
      // Get the new image URLs
      const newImageUrls = getImageUrlsFromContent();

      // Lưu nội dung hiện tại để có thể khôi phục nếu cần
      const currentContent = editor.getData();

      // Find URLs that were in the old set but not in the new set (deleted images)
      const deletedUrls = Array.from(currentImageUrls).filter(
        (url) => !newImageUrls.has(url),
      );

      if (deletedUrls.length > 0) {
        console.log('Detected deleted images:', deletedUrls);

        try {
          // Delete each removed image from the server
          // and keep track of which ones were successfully deleted
          const deletePromises = deletedUrls.map(async (url) => {
            const success = await deleteFileFromServer(url);
            return { url, success };
          });

          // Wait for all delete operations to complete
          const results = await Promise.all(deletePromises);

          // Kiểm tra xem có ảnh nào xóa thất bại không
          const failedDeletions = results.filter(({ success }) => !success);

          if (failedDeletions.length > 0) {
            // Có ít nhất một ảnh xóa thất bại, khôi phục nội dung
            console.warn('Some images failed to delete, restoring content');
            editor.setData(currentContent);

            // Không cần cập nhật currentImageUrls vì chúng ta đã khôi phục nội dung
          } else {
            // Tất cả ảnh đều xóa thành công, cập nhật danh sách theo dõi
            results.forEach(({ url }) => {
              console.log('Successfully deleted image:', url);
              currentImageUrls.delete(url);
            });

            // Thêm URL mới vào danh sách theo dõi
            newImageUrls.forEach((url) => {
              if (!currentImageUrls.has(url)) {
                currentImageUrls.add(url);
              }
            });
          }
        } catch (error) {
          console.error('Error processing deleted images:', error);
          // Khôi phục nội dung nếu có lỗi
          editor.setData(currentContent);
        }
      } else {
        // Không có ảnh bị xóa, chỉ cập nhật URL mới
        newImageUrls.forEach((url) => {
          if (!currentImageUrls.has(url)) {
            currentImageUrls.add(url);
          }
        });
      }
    });

    // Also listen for the delete event on images (as a backup)
    editor.editing.view.document.on('delete', (_evt: any, _data: any) => {
      // Get the selected element
      const selectedElement =
        editor.model.document.selection.getSelectedElement();

      // Check if it's an image
      if (selectedElement && selectedElement.name === 'imageBlock') {
        // Get the image URL
        const imageUrl = selectedElement.getAttribute('src');
        if (imageUrl && imageUrl.includes('/files/')) {
          console.log('Image delete event detected:', imageUrl);
          // The actual deletion will be handled by the change:data event
        }
      }
    });
  }

  const editorConfig = {
    extraPlugins: [MyCustomUploadAdapterPlugin, ImageDeletePlugin],
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'heading',
        'sourceEditing',
        '|',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'insertImage',
        '|',
        'bulletedList',
        'numberedList',
        'blockQuote',
        'outdent',
        'indent',
        '|',
        'insertTable',
        'codeBlock',
        'showBlocks',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Code,
      CodeBlock,
      Essentials,
      FindAndReplace,
      FullPage,
      GeneralHtmlSupport,
      HorizontalLine,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Link,
      LinkImage,
      List,
      ListProperties,
      Markdown,
      MediaEmbed,
      PageBreak,
      // Paragraph,
      PasteFromMarkdownExperimental,
      SelectAll,
      ShowBlocks,
      SimpleUploadAdapter,
      SourceEditing,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextPartLanguage,
      TextTransformation,
      Undo,
      Bold,
      Italic,
      Underline,
      Heading,
    ],
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
      ],
    },
    balloonToolbar: [
      '|',
      'link',
      'insertImage',
      '|',
      'bulletedList',
      'numberedList',
    ],
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
      ],
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: `Type or paste your content here!`,
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
    },
  };

  const handleEditorChange = (_event: Event, editor: ClassicEditor) => {
    const data = editor.getData();

    setEditorData(data);

    if (onChange) {
      onChange(data);
    }
  };

  return (
    <div className="ckeditor-wrap min-h-[372.22px]" ref={editorRef}>
      <CKEditor
        data={editorData}
        editor={ClassicEditor}
        config={editorConfig}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CustomEditor;
