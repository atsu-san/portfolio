""""affine transformation matrix sample"""
# -*- coding: utf-8 -*-
import sys
import math
from cv2 import cv2
import numpy as np
import matplotlib
import matplotlib.pyplot as plt

# matplotlibのデフォルト設定表示
# print(plt.rcParams)

# アフィン変換行列（同時変換）
# |x'|   |a b tx| |x|
# |y'| = |c d ty| |y|
# |1 |   |0 0 1 | |1|


def get_affine_tx_matrix_scale(a, d):
    """get affine transformation matrix"""
    # 拡大縮小（x軸方向にa倍、y軸方向にd倍）
    M = np.array([[a, 0, 0],
                  [0, d, 0],
                  [0, 0, 1]], np.float32)
    return M


def get_affine_tx_matrix_translate(tx, ty):
    """get affine transformation matrix"""
    # 平行移動（x軸方向にtx、y軸方向にty移動）
    M = np.array([[1, 0, tx],
                  [0, 1, ty],
                  [0, 0, 1]], np.float32)
    return M


def get_affine_tx_matrix_rotate_origin(theta_in_degrees):
    """get affine transformation matrix"""
    # 回転（原点周りにΘ回転）
    # cv2.getRotationMatrix2D使用可
    theta = math.radians(theta_in_degrees)
    M = np.array([[math.cos(theta), -math.sin(theta), 0],
                  [math.sin(theta), math.cos(theta), 0],
                  [0, 0, 1]], np.float32)
    return M


def get_affine_tx_matrix_rotate_center(theta_in_degrees, cx, cy):
    """get affine transformation matrix"""
    # 以下の処理の組み合わせ
    # (1) 対象物の中心を原点に移動
    # (2) 原点周りに回転
    # (3) 対象物の中心を元の位置に移動
    # 行列積を求める（右から左に掛けること）
    M1 = get_affine_tx_matrix_translate(-cx, -cy)
    M2 = get_affine_tx_matrix_rotate_origin(theta_in_degrees)
    M3 = get_affine_tx_matrix_translate(cx, cy)
    # M = np.dot(np.dot(M3, M2), M1)
    M = M3 @ M2 @ M1
    return M


def get_affine_tx_matrix_skew_x(alpha_in_degrees):
    """get affine transformation matrix"""
    # x軸方向のスキュー（四角形を平行四辺形に変形）
    alpha = math.radians(alpha_in_degrees)
    M = np.array([[1, math.tan(alpha), 0],
                  [0, 1, 0],
                  [0, 0, 1]], np.float32)
    return M


def get_affine_tx_matrix_skew_y(beta_in_degrees):
    """get affine transformation matrix"""
    # y軸方向のスキュー（四角形を平行四辺形に変形）
    beta = math.radians(beta_in_degrees)
    M = np.array([[1, 0, 0],
                  [math.tan(beta), 1, 0],
                  [0, 0, 1]], np.float32)
    return M


def get_affine_tx_matrix_reflect_x():
    """get affine transformation matrix"""
    # 鏡映（x軸）
    M = np.array([[1, 0, 0],
                  [0, -1, 0],
                  [0, 0, 1]], np.float32)
    return M


def get_affine_tx_matrix_reflect_y():
    """get affine transformation matrix"""
    # 鏡映（y軸）
    M = np.array([[-1, 0, 0],
                  [0, 1, 0],
                  [0, 0, 1]], np.float32)
    return M


def get_affine_tx_matrix_reflect_yx():
    """get affine transformation matrix"""
    # 鏡映（直線y=x）
    M = np.array([[0, 1, 0],
                  [1, 0, 0],
                  [0, 0, 1]], np.float32)
    return M


def get_affine_tx_matrix_reflect_origin():
    """get affine transformation matrix"""
    # 鏡映（原点）
    M = np.array([[-1, 0, 0],
                  [0, -1, 0],
                  [0, 0, 1]], np.float32)
    return M


def complementary_color(image):
    """apply complementary colors"""
    return cv2.bitwise_not(image)


def main():
    """main"""
    # imgは"ndarray"型
    img = cv2.imread('img/sample.jpg')

    if img is None:
        sys.exit("Could not read the image.")

    # unsigned 8 bit format
    img = cv2.cvtColor(img, cv2.CV_8U)
    # img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    horizontal_line = "=============================================================="

    print(horizontal_line)
    print("Image Details:")
    print(horizontal_line)
    print("ndarray.ndim", end="\t\t")
    print(img.ndim)
    print("ndarray.shape", end="\t\t")
    print(img.shape)
    print("ndarray.size", end="\t\t")
    print(img.size)
    print("ndarray.dtype", end="\t\t")
    print(img.dtype)
    print("ndarray.itemsize", end="\t")
    print(img.itemsize)
    print("ndarray.data", end="\t\t")
    print(img.data)
    height, width, n_channels = img.shape
    print("HEIGHT (y-axis): " + str(height) + ", WIDTH (x-axis): " +
          str(width) + ", COLOR CHANNELS: " + str(n_channels))
    print(horizontal_line)

    user_input = input(
        "Please press 'y' to see pixel information\n(or press any other key to skip): ")
    if user_input == 'y':
        h_digit = len(str(height))
        w_digit = len(str(width))
        for y in range(height):
            for x in range(width):
                print(f"y = {y:>{h_digit}}, x = {x:>{w_digit}}, BGR = ", end="")
                print(img[y, x])
    else:
        print("Skipped.")

    cv2.namedWindow("Original", cv2.WINDOW_AUTOSIZE)
    cv2.moveWindow("Original", 0, 0)
    cv2.imshow("Original", img)

    cv2.namedWindow("Complementary Color", cv2.WINDOW_AUTOSIZE)
    cv2.moveWindow("Complementary Color", 200, 0)
    cv2.imshow("Complementary Color", complementary_color(img))

    # 画像の左下を原点にするためにx軸を中心に反転
    img = cv2.flip(img, 0)

    print(horizontal_line)
    prompt_str = """Select the Affine transformation to perform:
    1 = scale about origin
    2 = translate
    3 = rotate about origin
    4 = rotate about center
    5 = skew in x direction
    6 = skew in y direction
    7 = reflect about x-axis
    8 = reflect about y-axis
    9 = reflect about y=x line
    10 = reflect about origin
    """
    while True:
        user_input = input(prompt_str)
        if user_input == '1':
            affine_matrix = get_affine_tx_matrix_scale(2, 2)
            break
        elif user_input == '2':
            affine_matrix = get_affine_tx_matrix_translate(150, 100)
            break
        elif user_input == '3':
            affine_matrix = get_affine_tx_matrix_rotate_origin(45)
            break
        elif user_input == '4':
            affine_matrix = get_affine_tx_matrix_rotate_center(
                45, width/2, height/2)
            break
        elif user_input == '5':
            affine_matrix = get_affine_tx_matrix_skew_x(15)
            break
        elif user_input == '6':
            affine_matrix = get_affine_tx_matrix_skew_y(15)
            break
        elif user_input == '7':
            affine_matrix = get_affine_tx_matrix_reflect_x()
            break
        elif user_input == '8':
            affine_matrix = get_affine_tx_matrix_reflect_y()
            break
        elif user_input == '9':
            affine_matrix = get_affine_tx_matrix_reflect_yx()
            break
        elif user_input == '10':
            affine_matrix = get_affine_tx_matrix_reflect_origin()
            break
        else:
            pass

    print(horizontal_line)
    print('Affine Transformation Matrix:')
    print(affine_matrix)
    print(horizontal_line)
    print('Affine Transformation Matrix for cv2.warpAffine:')

    # 画像の原点を座標軸の原点に移動
    affine_matrix = get_affine_tx_matrix_translate(
        width, height) @ affine_matrix

    # cv2.warpAffineのMには(3, 3) のアフィン変換行列のうち、3行目を除いた (2, 3) の行列を指定
    affine_2x3_matrix = np.delete(affine_matrix, 2, axis=0)
    print(affine_2x3_matrix)
    print(horizontal_line)

    # 背景色（BGR）を指定可能
    dst = cv2.warpAffine(img, M=affine_2x3_matrix,
                         dsize=(width*3, height*3), borderValue=(0, 255, 255))

    dst = cv2.cvtColor(dst, cv2.COLOR_BGR2RGB)

    fig = plt.figure(figsize=[6.4, 4.8])
    # 行、列、場所を設定
    ax = fig.add_subplot(1, 1, 1)

    # オリジナル画像の矩形を描画
    rect = plt.Rectangle((0, 0), width, height, fill=0, edgecolor="gray")
    ax.add_patch(rect)

    # 原点をデフォルトの左上ではなく左下にして描画
    # 左下の座標をマイナスに設定
    ax.imshow(dst, origin='lower',
              extent=[-width, width*2, -height, height*2])
    # plt.imshow(dst, origin='lower')
    ax.set_title("Affine Transformation")
    ax.set_xlabel("x-axis")
    ax.set_ylabel("y-axis")
    # グリッド線を灰色＋点線に変更
    ax.grid(color="gray", ls=":")
    # x軸、y軸を破線に設定
    ax.axhline(y=0, color="gray", ls="--")
    ax.axvline(x=0, color="gray", ls="--")

    plt.show(block=False)

    # matplotlibのバックエンドを確認
    backend = matplotlib.get_backend()
    # print(backend)
    if backend == 'TkAgg':
        # ウィンドウの位置を設定
        # geometry (width x height + x-position + y-position)
        mgr = plt.get_current_fig_manager()
        mgr.window.wm_geometry("+0+200")
        # geom = mgr.window.geometry()
        # print(geom)

    user_input = input("Press any key to exit: ")
    # cv2.imwrite("output.png", img)
    cv2.destroyAllWindows()
    plt.clf()
    plt.close('all')
    return 0


if __name__ == "__main__":
    main()
