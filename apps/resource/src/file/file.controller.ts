import { Controller, UseGuards, Get, Param, Req, Res, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { AuthGuard } from '@thepro/auth';
import { FileService } from './file.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { FileType } from '@prisma/client';
import { UploadedFileDto } from './dto/uploaded-file.dto';
import { StorageService } from '@thepro/storage';

@Controller('/file')
// @UseGuards(AuthGuard)
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly storageService: StorageService
  ) { }

  @Get('/:id')
  async getFile(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response
  ) {
    const { file, storedFile } = await this.fileService.getFile(id)

    if (file.type === FileType.FILE) {
      const fileUrl = await this.storageService.getSignedUrl(file.location)
      return response.redirect(fileUrl)
    }

    const [metadata] = await storedFile.getMetadata()
    const fileSize = metadata.size

    const range = request.headers.range

    if (range) {
      const [s, e] = range.replace(/bytes=/, '').split(';')
      const start = parseInt(s, 10)
      const end = e ? parseInt(e, 10) : fileSize - 1

      response.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': start - end + 1,
        'Content-Type': metadata.contentType
      })

      return storedFile.createReadStream({ start, end }).pipe(response)
    } else {
      response.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': metadata.contentType
      })

      return storedFile.createReadStream().pipe(response)
    }
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', { preservePath: true }))
  async uploadVideo(
    @Req() request: Request,
    @Res() response: Response,
    @Body() uploadFileDto: UploadedFileDto,
    @UploadedFile('file') file?
  ) {
  }
}
