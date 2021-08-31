import pygame

pygame.init()

W, H = 600, 400

sc = pygame.display.set_mode((600, 400))
pygame.display.set_caption("My first Pygame APP")
# pygame.display.set_icon(pygame.image.load('./img/app.ico'))

WHITE = (255, 255, 255)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)

clock = pygame.time.Clock()
FPS = 60

sp = None
sc.fill(WHITE)
pygame.display.update()
pygame.mouse.set_visible(False)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            exit()

    sc.fill(WHITE)

    pos = pygame.mouse.get_pos()
    if pygame.mouse.get_focused():
        pygame.draw.circle(sc, BLUE, pos, 7)


    pressed = pygame.mouse.get_pressed()
    if pressed[0]:
        if sp is None:
            sp = pos

        width = pos[0] - sp[0]
        height = pos[1] - sp[1]

        pygame.draw.rect(sc, RED, (sp[0], sp[1], width, height))
    else:
        sp = None

    pygame.display.update()
    clock.tick(FPS)

#
# elif event.type == pygame.MOUSEBUTTONDOWN:
# print("Click: ", event.button)
# elif event.type == pygame.MOUSEMOTION:
# print("Position: ", event.pos)
