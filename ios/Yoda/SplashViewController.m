//
//  SplashViewController.m
//  Bridgeme
//
//  Created by Mingyu Kim on 2016. 11. 30..
//  Copyright © 2016년 Facebook. All rights reserved.
//

#import "SplashViewController.h"
#import "FLAnimatedImage.h"

@interface SplashViewController ()

@end

@implementation SplashViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  
  NSURL *url = [[NSBundle mainBundle] URLForResource:@"splash_anim" withExtension:@"gif"];
  NSData *data = [NSData dataWithContentsOfURL:url];
  FLAnimatedImage *image = [FLAnimatedImage animatedImageWithGIFData:data];
  FLAnimatedImageView *imageView = [[FLAnimatedImageView alloc] init];
  imageView.animatedImage = image;
  imageView.frame = CGRectMake(0.0, 0.0, self.view.frame.size.width, self.view.frame.size.height);
  [self.view addSubview:imageView];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
