import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [
    // MulterModule.registerAsync({
    //   useFactory: () => ({
    //     limits: {
    //       fileSize: 1024 * 1024 * parseInt(process.env.MAX_FILE_SIZE),
    //     },
    //     storage: diskStorage({
    //       filename: (req, file, callback) => {
    //         let name = file.originalname.split('.').slice(0, -1).join('.'); // remove extension of the file
    //         name = name.split(/\s+/).join('-'); // remove space between words in name
    //         const fileExtName = extname(file.originalname);
    //         callback(null, `${name}_${Date.now()}${fileExtName}`);
    //       },
    //       destination: (req, file, callback) => {
    //         const uploadPath = process.env.IMAGE_UPLOAD_DIR;
    //         callback(null, `./${uploadPath}/images`);
    //       },
    //     }),
    //   }),
    // }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
